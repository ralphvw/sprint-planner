import express from "express";
import AuthMiddleware from "../middleware/auth";
import UserController from "../controllers/user";

const { checkIfEmailExists, validateEmail, validateUser, validatePassword } =
  AuthMiddleware;
const { signUp, login } = UserController;

const router = express.Router();

router.post(
  "/signup",
  validateEmail,
  checkIfEmailExists,
  validatePassword,
  signUp,
);
router.post("/login", validateUser, login);

export default router;
