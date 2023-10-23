import { Response } from "express";

class Helpers {
  static sendResponse(
    res: Response,
    data: any,
    message: string,
    code: number,
  ): Response {
    return res.status(code).json({ message, data });
  }
}

export default Helpers;
