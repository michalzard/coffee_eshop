import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, deleteCart, fetchCart, removeFromCart } from "../../eccommerce/cart";

export const CartRetrieve = createAsyncThunk("Cart/Retrieve", async () => {
  return await fetchCart();
});

export const CartAdd = createAsyncThunk("Cart/Add",async ({productId,quantity,variantId})=>{
  return await addToCart(productId,quantity,variantId);
});

export const CartRemove = createAsyncThunk("Cart/Remove",async ({id})=>{
  return await removeFromCart(id);
});

export const CartEmpty = createAsyncThunk("Cart/Empty",async()=>{
  return await deleteCart();
})