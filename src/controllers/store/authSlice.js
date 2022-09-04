import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      // state.value = action.payload;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    onSessionLoad: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
  },
});

export const { login, logout, register, onSessionLoad } = authSlice.actions;

export default authSlice.reducer;
