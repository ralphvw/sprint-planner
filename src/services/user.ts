import argon2 from "argon2";
import userQueries from "../db/queries/user";
import { db } from "../config/db";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { addUser, updatePassword } = userQueries;

class UserService {
  static async signUp({
    firstName,
    lastName,
    email,
    password,
  }: User): Promise<User> {
    const hashedPassword = await argon2.hash(password!);
    return db.one(addUser, [
      email?.toLowerCase().trim(),
      firstName,
      lastName,
      hashedPassword,
    ]);
  }

  static login(user: User) {
    return jwt.sign(user, process.env.SECRET!);
  }

  static resetPasswordToken(user: User) {
    return jwt.sign(user, process.env.SECRET!, { expiresIn: "1hr" });
  }

  static updatePassword(user: User, password: string) {
    return db.oneOrNone(updatePassword, [password, user.email]);
  }
}

export default UserService;
