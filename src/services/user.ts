import argon2 from "argon2";
import userQueries from "../db/queries/user";
import { db } from "../config/db";
import { User } from "../models/user";

const { addUser } = userQueries;

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
}

export default UserService;
