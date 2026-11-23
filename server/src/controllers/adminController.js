import mongoose from "mongoose";
import User from "../models/userModel.js";

export async function getUsers(req, res) {
  try {
    const users = await User.find()
      .select("_id name email phone role createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      users: users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone ?? "",
        role: user.role,
        joinedDate: user.createdAt,
      })),
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
}

export async function createRoom(req, res) {
  const {} = req.body;
}

export async function updateUser(req, res) {
  const { userId } = req.params;
  const body = req.body;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "A user update object is required" });
  }

  const allowedFields = ["name", "email", "phone", "role"];
  const unsupportedFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field),
  );

  if (unsupportedFields.length > 0) {
    return res.status(400).json({
      message: `Unsupported user field: ${unsupportedFields.join(", ")}`,
    });
  }

  const updates = {};
  for (const field of allowedFields) {
    if (!Object.hasOwn(body, field)) {
      continue;
    }

    if (
      typeof body[field] !== "string" ||
      (field !== "phone" && !body[field].trim())
    ) {
      return res.status(400).json({
        message:
          field === "phone"
            ? "phone must be a string"
            : `${field} must be a non-empty string`,
      });
    }

    updates[field] =
      field === "email" ? body[field].trim().toLowerCase() : body[field].trim();
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("_id name email phone role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: "Invalid user data",
        errors: Object.values(error.errors).map(({ message }) => message),
      });
    }

    console.error("UPDATE USER ERROR:", error);
    return res.status(500).json({ message: "Failed to update user" });
  }
}
