import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // ========================== Reference & Relationships ==========================
    bookingCode: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    // ========================== Stay & Guest Details ==========================
    checkInDate: {
      type: Date,
      required: true,
      index: true,
    },

    checkOutDate: {
      type: Date,
      required: true,
      index: true,
      validate: {
        validator: function (value) {
          return !this.checkInDate || value > this.checkInDate;
        },
        message: "checkOutDate must be after checkInDate",
      },
    },

    nights: {
      type: Number,
      required: true,
      min: 1,
    },

    roomsBooked: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    guests: {
      adults: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
      children: {
        type: Number,
        min: 0,
        default: 0,
      },
    },

    guestSnapshot: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
    },

    specialRequests: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    // ========================== Pricing Breakdown ==========================
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    taxesAndFees: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    discountAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      default: "USD",
    },

    // ========================== Status & Lifecycle ==========================
    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "confirmed",
        "checked_in",
        "completed",
        "cancelled",
        "rejected",
      ],
      default: "pending",
      index: true,
    },

    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed", "refunded", "partially_refunded"],
      default: "pending",
      index: true,
    },

    confirmedAt: {
      type: Date,
    },

    cancelledAt: {
      type: Date,
    },

    cancellationReason: {
      type: String,
      trim: true,
    },

    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for fast availability and overlap queries per room
bookingSchema.index({ room: 1, checkInDate: 1, checkOutDate: 1, status: 1 });

// Generate a human-readable booking reference code if not already set
bookingSchema.pre("save", function (next) {
  if (!this.bookingCode) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    this.bookingCode = `BK-${datePart}-${randomSuffix}`;
  }

  if (this.isModified("status")) {
    if (this.status === "confirmed" && !this.confirmedAt) {
      this.confirmedAt = new Date();
    }
    if (this.status === "cancelled" && !this.cancelledAt) {
      this.cancelledAt = new Date();
    }
  }

  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
