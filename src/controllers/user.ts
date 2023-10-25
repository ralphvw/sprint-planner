import UserServices from "../services/user";
import { Request, Response } from "express";
import constants from "../utils/constants";
import helpers from "../helpers/helpers";

const { USER_CREATED, SERVER_ERROR } = constants;
const { sendResponse } = helpers;
const { signUp } = UserServices;

class UserController {
  static async signUp(req: Request, res: Response) {
    try {
      const data = await signUp(req.body);
      return sendResponse(res, data, USER_CREATED, 200);
    } catch (error) {
      console.info("[SIGNUP CONTROLLER]", error.message);
      return sendResponse(res, null, SERVER_ERROR, 500);
    }
  }
}

export default UserController;
