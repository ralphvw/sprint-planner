import express from "express";
import AuthMiddleware from "../middleware/auth";
import UserController from "../controllers/user";

const {
  checkIfEmailExists,
  validateEmail,
  validateUser,
  validatePassword,
  getUser,
  resetPasswordMiddleWare,
} = AuthMiddleware;
const { signUp, login, sendResetPasswordLink, updatePassword } = UserController;

const router = express.Router();

router.post(
  "/signup",
  validateEmail,
  checkIfEmailExists,
  validatePassword,
  signUp,
);
router.post("/login", validateUser, login);
router.post("/reset-password-link", getUser, sendResetPasswordLink);
router.post("/reset-password", resetPasswordMiddleWare, updatePassword);

export default router;
