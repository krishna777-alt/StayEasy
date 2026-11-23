import mongoose from "mongoose";

const refundSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    reason: {
      type: String,
      trim: true,
    },
    refundedAt: {
      type: Date,
      default: Date.now,
    },
    gatewayRefundId: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const paymentSchema = new mongoose.Schema(
  {
    // ========================== Relationships ==========================
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
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

    // ========================== Transaction Details ==========================
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      default: "USD", // e.g., "USD", "INR", "EUR"
    },

    // Optional itemized breakdown
    nights: {
      type: Number,
      min: 1,
    },

    nightlyRate: {
      type: Number,
      min: 0,
    },

    taxesAndFees: {
      type: Number,
      min: 0,
      default: 0,
    },

    // ========================== Payment Method & Gateway ==========================
    paymentMethod: {
      type: String,
      required: true,
      enum: ["card", "apple_pay", "google_pay", "upi", "bank_transfer"],
      default: "card",
    },

    paymentGateway: {
      type: String,
      enum: ["stripe", "razorpay", "paypal", "manual"],
      default: "stripe",
    },

    // Non-sensitive display metadata for cards/wallets
    cardBrand: {
      type: String,
      trim: true, // e.g., "visa", "mastercard", "amex"
    },

    last4Digits: {
      type: String,
      trim: true,
      match: /^\d{4}$/,
    },

    gatewayOrderId: {
      type: String,
      trim: true,
    },

    gatewayPaymentId: {
      type: String,
      trim: true,
    },

    // ========================== Status & Refunds ==========================
    status: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed", "refunded", "partially_refunded"],
      default: "pending",
      index: true,
    },

    paidAt: {
      type: Date,
    },

    failureReason: {
      type: String,
      trim: true,
    },

    refunds: [refundSchema],
  },
  {
    timestamps: true,
  },
);

// Automatically set `paidAt` when status transitions to "paid"
paymentSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status === "paid" && !this.paidAt) {
    this.paidAt = new Date();
  }
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
