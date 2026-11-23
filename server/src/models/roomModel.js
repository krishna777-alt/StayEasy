import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    // ========================== Basic Information ==========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    roomTypeCode: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // ========================== Room Capacity ==========================
    maxOccupancy: {
      type: Number,
      required: true,
      min: 1,
    },

    bedType: {
      type: String,
      required: true,
      enum: ["Single", "Double", "Queen", "King", "Twin"],
    },

    beds: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    // ========================== Pricing ==========================
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    // ========================== Room Features ==========================
    size: {
      type: Number, // Room size in square meters
      min: 0,
    },

    hasAC: {
      type: Boolean,
      default: true,
    },

    hasBalcony: {
      type: Boolean,
      default: false,
    },

    smokingAllowed: {
      type: Boolean,
      default: false,
    },

    // ========================== Images ==========================
    image: String,
    photos: [
      {
        type: String,
      },
    ],

    // ========================== Availability ==========================
    // Physical inventory; date-range availability is computed from reservations.
    totalRooms: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "totalRooms must be a whole number",
      },
      default: 1,
    },

    status: {
      type: String,
      enum: ["available", "unavailable", "maintenance"],
      default: "available",
    },

    // ========================== Hotel Relationship ==========================
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
