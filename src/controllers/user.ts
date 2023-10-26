import UserServices from "../services/user";
import { Request, Response } from "express";
import constants from "../utils/constants";
import helpers from "../helpers/helpers";
import EmailServices from "../services/email/email";

const {
  USER_CREATED,
  SERVER_ERROR,
  LOGIN_SUCCESS,
  RESET_PASSWORD_EMAIL_SENT,
  PASSWORD_RESET_SUCCESSFULLY,
} = constants;
const { sendResponse, logAction } = helpers;
const { signUp, login, resetPasswordToken, updatePassword } = UserServices;
const { sendResetPasswordMail } = EmailServices;

class UserController {
  static async signUp(req: Request, res: Response) {
    try {
      const data = await signUp(req.body);
      logAction(`[SIGNUP_SUCCESS] ${req.body.email}`);
      return sendResponse(res, data, USER_CREATED, 200);
    } catch (error) {
      logAction(`ERROR: [SIGNUP_CONTROLLER] ${error.message}`);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }

  static login(req: Request, res: Response) {
    try {
      const token = login((req as any).user);
      const data = { token, user: (req as any).user };
      logAction(`[LOGIN_SUCCESS] ${req.body.email}`);
      return sendResponse(res, data, LOGIN_SUCCESS, 200);
    } catch (error) {
      logAction(`ERROR: [LOGIN_CONTROLLER] ${error.message}`);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }

  static async sendResetPasswordLink(req: Request, res: Response) {
    try {
      const { firstName, email } = (req as any).user;
      const token = resetPasswordToken((req as any).user);
      const link = `${process.env.SPRINT_PLANNER_FRONTEND_URL}/${token}`;
      await sendResetPasswordMail({ firstName, link, email });
      logAction(`[SEND_RESET_PASSWORD_EMAIL] ${email}`);
      return sendResponse(res, null, RESET_PASSWORD_EMAIL_SENT, 200);
    } catch (error) {
      logAction(
        `ERROR: [SEND_RESET_PASSWORD_EMAIL_CONTROLLER] ${error.message}`,
      );
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }

  static async updatePassword(req: Request, res: Response) {
    try {
      const data = await updatePassword(
        (req as any).user,
        (req as any).password,
      );
      logAction(`[PASSWORD_RESET] ${(req as any).user.email}`);
      return sendResponse(res, data, PASSWORD_RESET_SUCCESSFULLY, 200);
    } catch (error) {
      logAction(`ERROR: [RESET_PASSWORD_CONTROLLER] ${error.message}`);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }
}

export default UserController;
