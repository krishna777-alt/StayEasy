import { createSlice } from "@reduxjs/toolkit";

const initialStateGuest = {
  name: "",
  email: "",
  password: "",
  phone: null,
  role: "",
  createdAt: "",
};

const guestSlice = createSlice({
  name: "guest",
  initialState: initialStateGuest,
  reducers: {
    createGuest: (state, action) => {
      Object.assign(state, action.payload);
    },
    updateGuest: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
  },
});

export const { createGuest, updateGuest } = guestSlice.actions;
export default guestSlice.reducer;

// export function createGuest(name, email, password, role) {
//   return createGuestAction({
//     name,
//     email,
//     password,
//     role,
//     createdAt: new Date().toISOString(),
//   });
// }

// export function updateGuest(name, role) {
//   return updateGuestAction({ name, role });
// }
