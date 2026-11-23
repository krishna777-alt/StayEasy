import mongoose from "mongoose";
import Booking from "../models/bookingModel.js";
import Hotel from "../models/HotleModel.js";
import Payment from "../models/paymentModel.js";
import Room from "../models/roomModel.js";
import RoomReservation from "../models/roomReservationModel.js";
import { getAvailableRoomIndexes } from "../utils/roomAvailability.js";

const paymentMethods = ["card", "apple_pay", "google_pay", "upi", "bank_transfer"];
const bookingStatuses = [
  "pending",
  "confirmed",
  "checked_in",
  "completed",
  "cancelled",
  "rejected",
];
const pageSize = 50;

function isObjectId(value) {
  return mongoose.isValidObjectId(value);
}

function parseDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value
    ? null
    : date;
}

function getNights(checkInDate, checkOutDate) {
  return (checkOutDate.getTime() - checkInDate.getTime()) / 86_400_000;
}

function getStayDates(checkInDate, nights) {
  return Array.from(
    { length: nights },
    (_, index) => new Date(checkInDate.getTime() + index * 86_400_000),
  );
}

function getPagination(query) {
  const requestedPage = Number(query.page);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, 10000)
      : 1;
  return { page, skip: (page - 1) * pageSize, limit: pageSize };
}

function validateGuestCounts(guests) {
  if (!guests || typeof guests !== "object" || Array.isArray(guests)) {
    return null;
  }

  if (
    ![typeof guests.adults, typeof (guests.children ?? 0)].every((type) =>
      ["number", "string"].includes(type),
    )
  ) {
    return null;
  }

  const adults = Number(guests.adults);
  const children = Number(guests.children ?? 0);
  if (
    !Number.isInteger(adults) ||
    adults < 1 ||
    !Number.isInteger(children) ||
    children < 0
  ) {
    return null;
  }

  return { adults, children };
}

async function releaseIncompleteBooking(bookingId, paymentId) {
  const cleanup = [
    RoomReservation.deleteMany({ booking: bookingId }),
    Booking.deleteOne({ _id: bookingId }),
  ];
  if (paymentId) cleanup.push(Payment.deleteOne({ _id: paymentId }));

  const results = await Promise.allSettled(cleanup);
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Failed to clean up incomplete booking:", result.reason);
    }
  });
}

export async function createBooking(req, res) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "A booking request is required" });
  }

  const allowedFields = [
    "roomId",
    "checkInDate",
    "checkOutDate",
    "roomsBooked",
    "guests",
    "specialRequests",
    "paymentMethod",
  ];
  const unsupportedFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field),
  );
  if (unsupportedFields.length) {
    return res.status(400).json({
      message: `Unsupported booking field: ${unsupportedFields.join(", ")}`,
    });
  }

  const { roomId, checkInDate: checkInInput, checkOutDate: checkOutInput } = body;
  if (!isObjectId(roomId)) {
    return res.status(400).json({ message: "A valid roomId is required" });
  }

  const checkInDate = parseDate(checkInInput);
  const checkOutDate = parseDate(checkOutInput);
  if (!checkInDate || !checkOutDate) {
    return res.status(400).json({
      message: "checkInDate and checkOutDate must use YYYY-MM-DD format",
    });
  }

  const nights = getNights(checkInDate, checkOutDate);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (checkInDate < today || nights < 1 || nights > 365) {
    return res.status(400).json({
      message: "The stay must start today or later and be between 1 and 365 nights",
    });
  }

  const rawRoomsBooked = body.roomsBooked ?? 1;
  const roomsBooked =
    typeof rawRoomsBooked === "number" || typeof rawRoomsBooked === "string"
      ? Number(rawRoomsBooked)
      : Number.NaN;
  if (!Number.isInteger(roomsBooked) || roomsBooked < 1 || roomsBooked > 10) {
    return res.status(400).json({ message: "roomsBooked must be between 1 and 10" });
  }

  const guests = validateGuestCounts(body.guests ?? { adults: 1, children: 0 });
  if (!guests) {
    return res.status(400).json({
      message: "guests must include a positive integer adults count and a non-negative children count",
    });
  }

  const specialRequests = body.specialRequests ?? "";
  if (
    typeof specialRequests !== "string" ||
    specialRequests.trim().length > 1000
  ) {
    return res.status(400).json({
      message: "specialRequests must be a string of at most 1000 characters",
    });
  }

  const paymentMethod = body.paymentMethod ?? "card";
  if (!paymentMethods.includes(paymentMethod)) {
    return res.status(400).json({ message: "Unsupported payment method" });
  }

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    if (room.status !== "available") {
      return res.status(409).json({ message: "This room is not available for booking" });
    }

    const hotel = await Hotel.findOne({ _id: room.hotel, isActive: true });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found or inactive" });
    }
    if (guests.adults + guests.children > room.maxOccupancy * roomsBooked) {
      return res.status(400).json({
        message: "The selected rooms do not have enough guest capacity",
      });
    }

    const dates = getStayDates(checkInDate, nights);
    const roomIndexes = await getAvailableRoomIndexes(room, dates, roomsBooked);
    if (roomIndexes.length < roomsBooked) {
      return res.status(409).json({
        message: "There are not enough rooms available for the selected dates",
      });
    }

    const subtotal = Number((room.pricePerNight * nights * roomsBooked).toFixed(2));
    if (!Number.isFinite(subtotal)) {
      return res.status(400).json({ message: "The booking price is invalid" });
    }

    let booking;
    let payment;
    try {
      booking = await Booking.create({
        user: req.user._id,
        hotel: hotel._id,
        room: room._id,
        checkInDate,
        checkOutDate,
        nights,
        roomsBooked,
        guests,
        guestSnapshot: {
          fullName: req.user.name,
          email: req.user.email,
        },
        specialRequests: specialRequests.trim(),
        pricePerNight: room.pricePerNight,
        subtotal,
        taxesAndFees: 0,
        discountAmount: 0,
        totalAmount: subtotal,
        currency: "INR",
      });

      await RoomReservation.insertMany(
        dates.flatMap((date) =>
          roomIndexes.map((roomIndex) => ({
            room: room._id,
            booking: booking._id,
            date,
            roomIndex,
          })),
        ),
      );

      payment = await Payment.create({
        booking: booking._id,
        user: req.user._id,
        hotel: hotel._id,
        amount: subtotal,
        currency: "INR",
        nights,
        nightlyRate: room.pricePerNight,
        taxesAndFees: 0,
        paymentMethod,
        paymentGateway: "manual",
        status: "pending",
      });

      booking.payment = payment._id;
      await booking.save();
    } catch (error) {
      if (booking) await releaseIncompleteBooking(booking._id, payment?._id);
      if (error.code === 11000) {
        return res.status(409).json({
          message: "Room availability changed. Please select dates and try again.",
        });
      }
      throw error;
    }

    return res.status(201).json({
      message: "Booking created. Payment is pending; no charge was processed.",
      booking,
      payment,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: "Invalid booking data",
        errors: Object.values(error.errors).map(({ message }) => message),
      });
    }

    console.error("CREATE BOOKING ERROR:", error);
    return res.status(500).json({ message: "Failed to create booking" });
  }
}

export async function getMyBookings(req, res) {
  try {
    const { page, skip, limit } = getPagination(req.query);
    const [bookings, total] = await Promise.all([
      Booking.find({ user: req.user._id })
        .populate("hotel", "name slug location")
        .populate("room", "name roomTypeCode image")
        .populate("payment")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Booking.countDocuments({ user: req.user._id }),
    ]);

    return res.status(200).json({ bookings, page, pageSize: limit, total });
  } catch (error) {
    console.error("GET MY BOOKINGS ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
}

export async function getBooking(req, res) {
  const { bookingId } = req.params;
  if (!isObjectId(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
    })
      .populate("hotel", "name slug location")
      .populate("room", "name roomTypeCode image")
      .populate("payment");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ booking });
  } catch (error) {
    console.error("GET BOOKING ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch booking" });
  }
}

export async function cancelBooking(req, res) {
  const { bookingId } = req.params;
  if (!isObjectId(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  const cancellationReason =
    typeof req.body?.reason === "string" ? req.body.reason.trim() : "";
  if (cancellationReason.length > 500) {
    return res.status(400).json({ message: "Cancellation reason is too long" });
  }

  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: bookingId,
        user: req.user._id,
        status: { $in: ["pending", "confirmed"] },
        paymentStatus: { $in: ["pending", "failed"] },
      },
      {
        $set: {
          status: "cancelled",
          cancelledAt: new Date(),
          cancelledBy: req.user._id,
          cancellationReason,
        },
      },
      { new: true, runValidators: true },
    );

    if (!booking) {
      const exists = await Booking.exists({ _id: bookingId, user: req.user._id });
      return exists
        ? res.status(409).json({
            message: "This booking cannot be cancelled in its current state",
          })
        : res.status(404).json({ message: "Booking not found" });
    }

    try {
      await RoomReservation.deleteMany({ booking: booking._id });
    } catch (error) {
      console.error("CANCELLED BOOKING INVENTORY CLEANUP ERROR:", error);
      return res.status(500).json({
        message: "Booking was cancelled, but room availability cleanup failed",
      });
    }

    return res.status(200).json({ message: "Booking cancelled", booking });
  } catch (error) {
    console.error("CANCEL BOOKING ERROR:", error);
    return res.status(500).json({ message: "Failed to cancel booking" });
  }
}

export async function getHotelBookings(req, res) {
  const { hotelId } = req.params;
  if (!isObjectId(hotelId)) {
    return res.status(400).json({ message: "Invalid hotel ID" });
  }

  try {
    const hotelQuery = { _id: hotelId };
    if (req.user.role === "hotel") hotelQuery.owner = req.user._id;
    const hotel = await Hotel.findOne(hotelQuery).select("_id");
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const query = { hotel: hotel._id };
    if (req.query.status) {
      if (!bookingStatuses.includes(req.query.status)) {
        return res.status(400).json({ message: "Invalid booking status filter" });
      }
      query.status = req.query.status;
    }

    const { page, skip, limit } = getPagination(req.query);
    const [bookings, total] = await Promise.all([
      Booking.find(query)
        .populate("user", "name email")
        .populate("room", "name roomTypeCode")
        .populate("payment")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Booking.countDocuments(query),
    ]);

    return res.status(200).json({ bookings, page, pageSize: limit, total });
  } catch (error) {
    console.error("GET HOTEL BOOKINGS ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch hotel bookings" });
  }
}

export async function updateHotelBookingStatus(req, res) {
  const { hotelId, bookingId } = req.params;
  if (!isObjectId(hotelId) || !isObjectId(bookingId)) {
    return res.status(400).json({ message: "Invalid hotel or booking ID" });
  }

  const nextStatus = req.body?.status;
  if (!bookingStatuses.includes(nextStatus)) {
    return res.status(400).json({ message: "Invalid booking status" });
  }

  const reason =
    typeof req.body?.reason === "string" ? req.body.reason.trim() : "";
  if (reason.length > 500) {
    return res.status(400).json({ message: "Cancellation reason is too long" });
  }

  try {
    const hotelQuery = { _id: hotelId };
    if (req.user.role === "hotel") hotelQuery.owner = req.user._id;
    const hotel = await Hotel.findOne(hotelQuery).select("_id");
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const booking = await Booking.findOne({ _id: bookingId, hotel: hotel._id });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const transitions = {
      pending: ["confirmed", "rejected", "cancelled"],
      confirmed: ["checked_in", "cancelled"],
      checked_in: ["completed"],
      completed: [],
      cancelled: [],
      rejected: [],
    };
    if (!transitions[booking.status].includes(nextStatus)) {
      return res.status(409).json({
        message: `Booking cannot transition from ${booking.status} to ${nextStatus}`,
      });
    }
    if (
      ["cancelled", "rejected"].includes(nextStatus) &&
      booking.paymentStatus === "paid"
    ) {
      return res.status(409).json({
        message: "A paid booking requires a verified refund before cancellation",
      });
    }

    const updatedAt = new Date();
    const updates = { status: nextStatus };
    if (nextStatus === "cancelled" || nextStatus === "rejected") {
      updates.cancellationReason = reason;
    }
    if (nextStatus === "cancelled") {
      updates.cancelledAt = updatedAt;
      updates.cancelledBy = req.user._id;
    }
    if (nextStatus === "confirmed") updates.confirmedAt = updatedAt;

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: booking._id, status: booking.status },
      { $set: updates },
      { new: true, runValidators: true },
    );
    if (!updatedBooking) {
      return res.status(409).json({
        message: "Booking status changed. Refresh and try again.",
      });
    }

    if (nextStatus === "cancelled" || nextStatus === "rejected") {
      try {
        await RoomReservation.deleteMany({ booking: updatedBooking._id });
      } catch (error) {
        console.error("BOOKING INVENTORY CLEANUP ERROR:", error);
        return res.status(500).json({
          message: "Booking status was updated, but room availability cleanup failed",
        });
      }
    }

    return res
      .status(200)
      .json({ message: "Booking status updated", booking: updatedBooking });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "Invalid booking status update" });
    }
    console.error("UPDATE BOOKING STATUS ERROR:", error);
    return res.status(500).json({ message: "Failed to update booking status" });
  }
}

export async function getPayments(req, res) {
  try {
    const query = {};
    if (req.query.status) {
      if (
        !["pending", "paid", "failed", "refunded", "partially_refunded"].includes(
          req.query.status,
        )
      ) {
        return res.status(400).json({ message: "Invalid payment status filter" });
      }
      query.status = req.query.status;
    }

    const { page, skip, limit } = getPagination(req.query);
    const [payments, total] = await Promise.all([
      Payment.find(query)
        .populate("user", "name email")
        .populate("hotel", "name")
        .populate("booking", "bookingCode checkInDate checkOutDate status")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Payment.countDocuments(query),
    ]);

    return res.status(200).json({ payments, page, pageSize: limit, total });
  } catch (error) {
    console.error("GET PAYMENTS ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch payments" });
  }
}