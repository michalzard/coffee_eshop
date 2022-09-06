import { createSlice } from "@reduxjs/toolkit";
import { LoadSession, UserLogin, UserLogout } from "./reducers/authReducers";

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
  extraReducers: (builder) => {
    //session
    builder.addCase(LoadSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(LoadSession.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error.session = "";
    });
    builder.addCase(LoadSession.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.error.session = action.payload;
    });

    //login
    builder.addCase(UserLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UserLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error.login = "";
      state.isLoggedIn = true;
    });
    builder.addCase(UserLogin.rejected, (state, action) => {
      state.loading = false;
      state.error.login = action.payload;
      state.isLoggedIn = false;
      state.user = null;
    });

    //logout
    builder.addCase(UserLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UserLogout.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error.session = action.payload;
    });
    builder.addCase(UserLogout.rejected, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error.session = action.payload;
    });
  },
});

export default authSlice.reducer;
