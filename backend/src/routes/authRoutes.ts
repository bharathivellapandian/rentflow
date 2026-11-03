import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login } from "../controllers/authController";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  "/login",
  loginLimiter,
  login
);

export default router;