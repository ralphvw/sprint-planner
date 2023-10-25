import UserServices from "../services/user";
import { Request, Response } from "express";
import constants from "../utils/constants";
import helpers from "../helpers/helpers";

const { USER_CREATED, SERVER_ERROR, LOGIN_SUCCESS } = constants;
const { sendResponse, logAction } = helpers;
const { signUp, login } = UserServices;

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
}

export default UserController;
