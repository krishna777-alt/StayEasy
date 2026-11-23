import { Router } from "express";
import {
  authenticate,
  authorize,
  login,
  logout,
  refresh,
  registerUser,
} from "../controllers/authController.js";
import {
  changeMyPassword,
  getMyAccount,
  updateMyAccount,
} from "../controllers/accountController.js";
import {
  cancelBooking,
  createBooking,
  getBooking,
  getMyBookings,
} from "../controllers/clientController.js";

const route = Router();

route.post("/signup", registerUser);
route.post("/login", login);
route.post("/refresh", refresh);
route.post("/logout", logout);
route.get("/account/me", authenticate, getMyAccount);
route.patch("/account/me", authenticate, updateMyAccount);
route.patch("/account/password", authenticate, changeMyPassword);
route.post(
  "/bookings",
  authenticate,
  authorize("user", "hotel", "admin"),
  createBooking,
);
route.get(
  "/bookings",
  authenticate,
  authorize("user", "hotel", "admin"),
  getMyBookings,
);
route.get(
  "/bookings/:bookingId",
  authenticate,
  authorize("user", "hotel", "admin"),
  getBooking,
);
route.patch(
  "/bookings/:bookingId/cancel",
  authenticate,
  authorize("user", "hotel", "admin"),
  cancelBooking,
);
export default route;
