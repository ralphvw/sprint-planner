import express from "express";
import AuthRoutes from "./auth";

const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to sprint planner API, All good" });
});

router.use("/auth", AuthRoutes);

export default router;
