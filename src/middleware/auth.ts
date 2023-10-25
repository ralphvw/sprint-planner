import { Request, Response, NextFunction } from "express";
import Helpers from "../helpers/helpers";
import constants from "../utils/constants";
import userQueries from "../db/queries/user";
import { db } from "src/config/db";

const { checkIfEmailExists } = userQueries;
const { EMAIL_IS_REQUIRED, EMAIL_ALREADY_EXISTS, INVALID_EMAIL, SERVER_ERROR } =
  constants;

const { sendResponse } = Helpers;
class AuthMiddleware {
  static validateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email = null } = req.body;

      if (!email) return sendResponse(res, null, EMAIL_IS_REQUIRED, 400);
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        console.info("[INVALID_EMAIL]", email);
        return sendResponse(res, null, INVALID_EMAIL, 400);
      }
      next();
    } catch (error) {
      console.info("[VALIDATE_EMAIL_MIDDLEWARE]", error.message);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }

  static async checkIfEmailExists(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email = null } = await db.oneOrNone(checkIfEmailExists, [
        req.body.email.toLowerCase().trim(),
      ]);
      if (email) {
        console.info("[EXISTING_EMAIL]", email);
        return sendResponse(res, null, EMAIL_ALREADY_EXISTS, 409);
      }
      next();
    } catch (error) {
      console.info("[EMAIL_EXISTS_MIDDLEWARE]", error.message);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }
}

export default AuthMiddleware;
