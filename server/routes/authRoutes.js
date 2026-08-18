import express from "express";
import {
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

export default router;
