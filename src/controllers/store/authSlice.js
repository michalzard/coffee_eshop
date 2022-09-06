import { createSlice } from "@reduxjs/toolkit";
import {
  LoadSession,
  UserLogin,
  UserLogout,
  UserRegistration,
} from "./reducers/authReducers";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: {
      login: "",
      register: "",
      session: "",
    },
  },
  extraReducers: {
    //Auth / Session
    [LoadSession.pending]: (state) => {
      state.loading = true;
    },
    [LoadSession.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error.session = "";
    },
    [LoadSession.rejected]: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.error.session = action.payload;
    },
    //Auth / Login
    [UserLogin.pending]: (state) => {
      state.loading = true;
    },
    [UserLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error.login = "";
      state.isLoggedIn = true;
    },
    [UserLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error.login = action.payload;
      state.isLoggedIn = false;
      state.user = null;
    },

    //Auth / Register
    [UserRegistration.pending]: (state) => {
      state.loading = true;
    },
    [UserRegistration.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.error.register = "";
      state.user = action.payload;
    },
    [UserRegistration.rejected]: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error.register = action.payload;
    },

    //Auth / Logout
    [UserLogout.pending]: (state) => {
      state.loading = true;
    },
    [UserLogout.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error.session = action.payload;
    },
    [UserLogout.rejected]: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error.session = action.payload;
    },
  },
});

export default authSlice.reducer;
