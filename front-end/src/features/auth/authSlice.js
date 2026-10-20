import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user ?? null;
      state.isAuthenticated = true;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAccessToken, setCredentials, logout, setAuthLoading } =
  authSlice.actions;
export default authSlice.reducer;
