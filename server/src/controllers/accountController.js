import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenServices.js";

function serializeUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    role: user.role,
    joinedAt: user.createdAt,
  };
}

export async function getMyAccount(req, res) {
  try {
    const user = await User.findById(req.user._id).select(
      "_id name email phone role createdAt",
    );
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json({ user: serializeUser(user) });
  } catch (error) {
    console.error("GET ACCOUNT ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch account" });
  }
}

export async function updateMyAccount(req, res) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "An account update is required" });
  }

  const allowedFields = ["name", "email", "phone"];
  const unsupportedFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field),
  );
  if (unsupportedFields.length) {
    return res.status(400).json({
      message: `Unsupported account field: ${unsupportedFields.join(", ")}`,
    });
  }

  const updates = {};
  for (const field of allowedFields) {
    if (!Object.hasOwn(body, field)) continue;
    if (typeof body[field] !== "string") {
      return res.status(400).json({ message: `${field} must be a string` });
    }

    const value = body[field].trim();
    if (field !== "phone" && !value) {
      return res.status(400).json({ message: `${field} cannot be empty` });
    }
    updates[field] = field === "email" ? value.toLowerCase() : value;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("_id name email phone role createdAt");

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(200).json({
      message: "Account updated successfully",
      user: serializeUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map(({ message }) => message)
          .join(", "),
      });
    }

    console.error("UPDATE ACCOUNT ERROR:", error);
    return res.status(500).json({ message: "Failed to update account" });
  }
}

export async function changeMyPassword(req, res) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "Password details are required" });
  }

  const unsupportedFields = Object.keys(body).filter(
    (field) => !["currentPassword", "newPassword"].includes(field),
  );
  if (unsupportedFields.length) {
    return res.status(400).json({
      message: `Unsupported password field: ${unsupportedFields.join(", ")}`,
    });
  }

  const { currentPassword, newPassword } = body;
  if (typeof currentPassword !== "string" || !currentPassword) {
    return res.status(400).json({ message: "Current password is required" });
  }
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return res.status(400).json({
      message: "New password must be at least 8 characters",
    });
  }

  try {
    const user = await User.findById(req.user._id).select(
      "+password +refreshTokens",
    );
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({
        message: "Choose a new password different from your current password",
      });
    }

    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateAccessToken(user);
    user.password = newPassword;
    user.refreshTokens = [refreshToken];
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Password updated successfully",
      accessToken,
      user: serializeUser(user),
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "The new password is invalid" });
    }

    console.error("CHANGE PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Failed to update password" });
  }
}
