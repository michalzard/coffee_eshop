import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart } from "../../eccommerce/cart";

export const CartRetrieve = createAsyncThunk("Cart/Retrieve", async () => {
  return await fetchCart();
});
