import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import hotelReducer from "../features/hotel/hotelSlice";
import roomReducer from "../features/hotel/roomSlice";
import guestReducer from "../features/user/guestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelReducer,
    room: roomReducer,
    guest: guestReducer,
  },
});
