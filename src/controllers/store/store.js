import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";

export const store = configureStore(
  {
    reducer: {
      authState: AuthSlice,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
