import { Request, Response, NextFunction } from "express";
import Helpers from "../helpers/helpers";
import constants from "../utils/constants";
import userQueries from "../db/queries/user";
import { db } from "../config/db";
import argon2 from "argon2";

const { checkIfEmailExists, getUserByEmail } = userQueries;
const {
  EMAIL_IS_REQUIRED,
  EMAIL_ALREADY_EXISTS,
  INVALID_EMAIL,
  SERVER_ERROR,
  PASSWORD_LENGTH,
  PASSWORD_TOO_SHORT,
  PASSWORD_IS_REQUIRED,
  INVALID_LOGIN,
} = constants;

const { sendResponse, logAction } = Helpers;
class AuthMiddleware {
  static validateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email = null } = req.body;

      if (!email) return sendResponse(res, null, EMAIL_IS_REQUIRED, 400);
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        const logData = `[INVALID_EMAIL] ${email}`;
        logAction(logData);
        return sendResponse(res, null, INVALID_EMAIL, 400);
      }
      next();
    } catch (error) {
      const logData = `ERROR: [VALIDATE_EMAIL_MIDDLEWARE] ${error.message}`;
      logAction(logData);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }

  static validatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password = null } = req.body;
      if (!password) {
        const logData = `[INVALID_PASSWORD]`;
        logAction(logData);
        return sendResponse(res, null, PASSWORD_IS_REQUIRED, 400);
      }
      if (password.length < PASSWORD_LENGTH) {
        return sendResponse(res, null, PASSWORD_TOO_SHORT, 400);
      }
      next();
    } catch (error) {
      logAction(`ERROR: [VALIDATE_PASSWORD_MIDDLEWARE] ${error.message}`);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }

  static async checkIfEmailExists(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await db.oneOrNone(checkIfEmailExists, [
        req.body.email.toLowerCase().trim(),
      ]);
      if (user) {
        logAction(`[EXISTING_EMAIL] ${user.email}`);
        return sendResponse(res, null, EMAIL_ALREADY_EXISTS, 409);
      }
      next();
    } catch (error) {
      logAction(`ERROR: [EMAIL_EXISTS_MIDDLEWARE] ${error.message}`);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }

  static async validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return sendResponse(res, null, EMAIL_IS_REQUIRED, 400);
      }
      if (!password) {
        return sendResponse(res, null, PASSWORD_IS_REQUIRED, 400);
      }
      const user = await db.oneOrNone(getUserByEmail, [req.body.email]);
      if (!user) {
        logAction(`[USER_DOES_NOT_EXIST] ${email}`);
        return sendResponse(res, null, INVALID_LOGIN, 400);
      }
      const valid = await argon2.verify(user.password, password);
      if (!valid) {
        const logData = `[INVALID_LOGIN] ${email}`;
        logAction(logData);
        return sendResponse(res, null, INVALID_LOGIN, 400);
      }
      (req as any).user = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      next();
    } catch (error) {
      logAction(`ERROR: [VALIDATE_USER_MIDDLEWARE] ${error.message}`);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }
}

export default AuthMiddleware;
