import mongoose from "mongoose";

const roomReservationSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    roomIndex: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

roomReservationSchema.index(
  { room: 1, date: 1, roomIndex: 1 },
  { unique: true },
);
roomReservationSchema.index({ booking: 1 });

const RoomReservation = mongoose.model("RoomReservation", roomReservationSchema);

export default RoomReservation;
