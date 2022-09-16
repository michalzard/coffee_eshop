import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URI } from "../../../lib/base_uri";
import { CartEmpty, CartRetrieve } from "./cartReducers";

export const LoadSession = createAsyncThunk(
  "Auth/SessionLoad",
  async (_, { dispatch, rejectWithValue }) => {
    return await axios
      .get(`${BASE_URI}/auth/session`, { withCredentials: true })
      .then((data) => {
        const { user } = data.data;
        if (user) dispatch(CartRetrieve());
        else dispatch(CartEmpty());
        return user;
      })
      .catch((err) => {
        const { message } = err.response.data;
        dispatch(CartEmpty());
        return rejectWithValue(message);
      });
  }
);

export const UserLogin = createAsyncThunk(
  "Auth/Login",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    return await axios
      .post(
        `${BASE_URI}/auth/login`,
        { name: username, password },
        { withCredentials: true }
      )
      .then((data) => {
        const { user } = data.data;
        if (user) dispatch(CartRetrieve());
        return user;
      })
      .catch((err) => {
        const { message } = err.response.data;
        return rejectWithValue(message);
      });
  }
);

export const UserLogout = createAsyncThunk(
  "Auth/Logout",
  async (_, { rejectWithValue }) => {
    return await axios
      .post(`${BASE_URI}/auth/logout`, {}, { withCredentials: true })
      .then((data) => {
        const { message } = data.data;
        return message;
      })
      .catch((err) => {
        const { message } = err.response.data;
        return rejectWithValue(message);
      });
  }
);

export const UserRegistration = createAsyncThunk(
  "Auth/Register",
  async ({ username, email, password }, { rejectWithValue }) => {
    return await axios
      .post(
        `${BASE_URI}/auth/register`,
        { name: username, email, password },
        { withCredentials: true }
      )
      .then((data) => {
        const { user } = data.data;
        return user;
      })
      .catch((err) => {
        const { message } = err.response.data;
        return rejectWithValue(message);
      });
  }
);
