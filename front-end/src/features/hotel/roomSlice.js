import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/hotels/display_rooms", { params });
      return data.rooms;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch rooms",
      );
    }
  },
);

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (roomDetails, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/hotels/create_room", roomDetails);
      return data.room;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create room",
      );
    }
  },
);

const initialState = {
  rooms: [],
  status: "idle",
  error: null,
  createStatus: "idle",
  createError: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearRoomErrors: (state) => {
      state.error = null;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(createRoom.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.rooms.unshift(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error.message;
      });
  },
});

export const { clearRoomErrors } = roomSlice.actions;
export const selectRooms = (state) => state.room.rooms;
export const selectRoomsStatus = (state) => state.room.status;
export const selectRoomsError = (state) => state.room.error;
export const selectCreateRoomStatus = (state) => state.room.createStatus;
export const selectCreateRoomError = (state) => state.room.createError;

export default roomSlice.reducer;