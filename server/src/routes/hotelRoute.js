import express from "express";
import {
  createHotel,
  createRoom,
  getAllHotels,
  getAllRooms,
  getHotelById,
  getHotelDashboard,
  getRoomById,
  updateRoom,
} from "../controllers/HotelController.js";
import {
  getHotelBookings,
  updateHotelBookingStatus,
} from "../controllers/clientController.js";
import { authenticate, authorize } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/create_hotel",
  authenticate,
  authorize("admin", "hotel"),
  createHotel,
);
router.get("/display_hotels", getAllHotels);
router.get("/hotel/:hotelId", getHotelById);
router.get(
  "/dashboard",
  authenticate,
  authorize("admin", "hotel"),
  getHotelDashboard,
);
router.post(
  "/create_room",
  authenticate,
  authorize("admin", "hotel"),
  createRoom,
);
router.get("/display_rooms", getAllRooms);
router.get("/room/:roomId", getRoomById);
router.patch(
  "/room/:roomId",
  authenticate,
  authorize("admin", "hotel"),
  updateRoom,
);
router.get(
  "/:hotelId/bookings",
  authenticate,
  authorize("admin", "hotel"),
  getHotelBookings,
);
router.patch(
  "/:hotelId/bookings/:bookingId/status",
  authenticate,
  authorize("admin", "hotel"),
  updateHotelBookingStatus,
);

export default router;
