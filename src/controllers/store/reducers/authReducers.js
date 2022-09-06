import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URI } from "../../../lib/base_uri";
export const LoadSession = createAsyncThunk(
    "Auth/SessionLoad",
    async (data, { rejectWithValue }) => {
      return await axios.get(`${BASE_URI}/auth/session`, { withCredentials: true })
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
  
  export const UserLogin = createAsyncThunk(
    "Auth/Login",
    async ({ username, password }, { rejectWithValue }) => {
      return await axios
        .post(`${BASE_URI}/auth/login`,{ name: username, password },{ withCredentials: true })
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
  
  export const UserLogout = createAsyncThunk(
    "Auth/Logout",
    async (data, { rejectWithValue }) => {
      return await axios.post(`${BASE_URI}/auth/logout`,{},{ withCredentials: true })
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