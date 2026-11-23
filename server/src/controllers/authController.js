import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenServices.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Basic password validation
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Create user
    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    await user.save();

    // Never return password
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const authenticate = async (req, res, next) => {
  const authorization = req.get("authorization") || "";
  const [scheme, token, ...extraParts] = authorization.trim().split(/\s+/);

  if (scheme !== "Bearer" || !token || extraParts.length > 0) {
    return res.status(401).json({
      message: "A valid bearer access token is required",
    });
  }

  if (!process.env.ACCESS_SECRET_KEY) {
    console.error("ACCESS_SECRET_KEY is not configured");
    return res.status(500).json({
      message: "Authentication is not configured",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
  } catch {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }

  if (typeof decoded !== "object" || !decoded.userId) {
    return res.status(401).json({
      message: "Invalid access token payload",
    });
  }

  try {
    const user = await User.findById(decoded.userId).select(
      "_id name email role",
    );

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error("AUTHENTICATION ERROR:", err);
    return res.status(500).json({
      message: "Failed to authenticate request",
    });
  }
};

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication is required",
    });
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      message: "You do not have permission to perform this action",
    });
  }

  return next();
};

export const login = async function (req, res) {
  try {
    const body = req.body ?? {};

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    if (!user) {
      return res.status(400).json({ message: "Failed, user doesn't exist!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    user.refreshTokens = user.refreshTokens ?? [];
    if (!user.refreshTokens.includes(refreshToken)) {
      user.refreshTokens.push(refreshToken);
    }
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to Login",
      ERROR: err.message,
    });
  }
};

export const refresh = async function (req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired refresh token",
      });
    }

    const userId = decoded?.userId;
    if (!userId) {
      return res.status(401).json({
        message: "Invalid refresh token payload",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const isStoredRefreshToken = user.refreshTokens?.includes(refreshToken);
    if (!isStoredRefreshToken) {
      return res.status(401).json({
        message: "Refresh token revoked",
      });
    }

    const newAccessToken = generateAccessToken(user);

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.log("ERROR:", err.message);
    return res.status(500).json({
      message: "Failed to refresh token",
    });
  }
};

export const logout = async function (req, res) {
  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await User.updateOne(
        { refreshTokens: refreshToken },
        { $pull: { refreshTokens: refreshToken } },
      );
    }

    res.clearCookie("refreshToken", cookieOptions);

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    res.clearCookie("refreshToken", cookieOptions);

    return res.status(500).json({
      message: "Failed to logout",
    });
  }
};
