import { Response } from "express";
import * as fs from "fs/promises";

class Helpers {
  static sendResponse(
    res: Response,
    data: any,
    message: string,
    code: number,
  ): Response {
    return res.status(code).json({ message, data });
  }

  static logAction(data: string) {
    try {
      const filename = "log.txt";
      data += ` on ${new Date().toDateString()} @ ${new Date().toLocaleTimeString()}`;
      console.info(data);
      fs.appendFile(filename, `${data} \n`);
    } catch (error) {
      console.info("[LOG_ACTION]", error.message);
    }
  }
}

export default Helpers;
