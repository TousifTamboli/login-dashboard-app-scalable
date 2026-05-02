import express from "express";
import { register, login, refresh, logout } from "../controllers/authController.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginLimiter ,login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;