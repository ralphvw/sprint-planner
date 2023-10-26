import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import constants from "../../utils/constants";
import { resetPasswordEmail } from "./templates/resetPassword";

dotenv.config();

const { EMAIL_WAS_NOT_SENT } = constants;
sgMail.setApiKey(process.env.SPRINT_PLANNER_SENDGRID_API_KEY!);

class EmailServices {
  /*
   * Sends an email
   * @param {any} options
   * @returns {Promise<object | string>}
   */
  static async send(options: any) {
    const mailConfig = { ...options, from: process.env.SPRINT_PLANNER_EMAIL };
    if (process.env.NODE_ENV === "test") {
      return new Promise((resolve) => {
        resolve("success");
      });
    }
    return new Promise((resolve, reject) => {
      sgMail
        .send(mailConfig)
        .then(() => {
          resolve("success");
        })
        .catch((err) => {
          const moduleError = {
            name: "ModuleError",
            message: `${EMAIL_WAS_NOT_SENT} => ${err.message}`,
            status: 500,
          };
          reject(moduleError);
        });
    });
  }

  /*
   * Sends the wailist email
   * @param {string} subject
   * @param {string} email
   * @returns {Promise<object | string>}
   */
  static async sendResetPasswordMail(
    { firstName, link, email }: any,
    subject = "Reset Your Password",
  ) {
    const emailContent = resetPasswordEmail(firstName, link);
    return EmailServices.send({ to: email, subject, html: emailContent });
  }
}

export default EmailServices;
