import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    register: (state, action) => {
      // document
    },
    logout: (state) => {
      state.token = null;
    },
    onSessionLoad: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
  },
});

export const { login, logout, register, onSessionLoad } = authSlice.actions;

export default authSlice.reducer;
