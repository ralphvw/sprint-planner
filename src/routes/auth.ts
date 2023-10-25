import express from "express";
import AuthMiddleware from "../middleware/auth";
import UserController from "../controllers/user";

const { checkIfEmailExists, validateEmail } = AuthMiddleware;
const { signUp } = UserController;

const router = express.Router();

router.post("/signup", validateEmail, checkIfEmailExists, signUp);

export default router;
