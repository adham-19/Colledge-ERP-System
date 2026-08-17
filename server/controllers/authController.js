import crypto from "crypto";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";
import Student from "../models/student.js";
import Faculty from "../models/faculty.js";
import { sendResetEmail } from "../services/emailService.js";

const models = {
  admin: Admin,
  student: Student,
  faculty: Faculty,
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({
        message: "Email and account type are required",
      });
    }

    const UserModel = models[role.toLowerCase()];
    if (!UserModel) {
      return res.status(400).json({
        message: "Invalid account type",
      });
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase().trim(),
    });

    // In production, use the same generic response
    // whether the email exists or not.
    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    // Raw token -> sent by email
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hashed token -> stored in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    // 15 minutes
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetURL =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}/${role}`;

    await sendResetEmail(user.email, resetURL);

    return res.status(200).json({
      message: "Password reset email sent",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, role } = req.body;

    if (!password || !role) {
      return res.status(400).json({
        message: "Password and account type are required",
      });
    }

    const UserModel = models[role.toLowerCase()];

    if (!UserModel) {
      return res.status(400).json({
        message: "Invalid account type",
      });
    }

    // Hash the token received from the URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Invalidate the token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    // User has successfully set a new password
    user.passwordUpdated = true;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};