import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";
import cartSlice from "./cartSlice";
// import checkoutSlice from "./checkoutSlice";
import productSlice from "./productSlice";

export const store = configureStore(
  {
    reducer: {
      authState: AuthSlice,
      cart: cartSlice,
      // checkout:checkoutSlice,
      productsState: productSlice,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
