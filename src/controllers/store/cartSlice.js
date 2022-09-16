import { createSlice } from "@reduxjs/toolkit";
import {
  CartAdd,
  CartEmpty,
  CartRemove,
  CartRetrieve,
} from "../store/reducers/cartReducers";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    id: "",
    total_items: 0,
    unique_items: 0,
    subtotal: {},
    line_items: [],
    currency: {},
    discount: [],
    loading: false,
  },
  extraReducers: {
    //
    [CartRetrieve.pending]: (state) => {
      state.loading = true;
    },
    [CartRetrieve.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        id,
        total_items,
        subtotal,
        line_items,
        currency,
        discount,
        total_unique_items,
      } = action.payload;
      state.id = id;
      state.total_items = total_items;
      state.subtotal = subtotal;
      state.items = line_items;
      state.currency = currency;
      state.discount = discount;
      state.unique_items = total_unique_items;
    },
    [CartRetrieve.rejected]: (state) => {
      state.loading = false;
    },
    //Add
    [CartAdd.pending]: (state) => {
      state.loading = true;
    },
    [CartAdd.fulfilled]: (state, action) => {
      state.loading = false;
      //handle on cart add
      //push to items array or smn
      const {
        id,
        total_items,
        subtotal,
        line_items,
        currency,
        discount,
        total_unique_items,
      } = action.payload.cart;
      state.id = id;
      state.total_items = total_items;
      state.subtotal = subtotal;
      state.line_items = line_items;
      state.currency = currency;
      state.discount = discount;
      state.unique_items = total_unique_items;
    },
    [CartAdd.rejected]: (state) => {
      state.loading = true;
    },
    //Remove
    [CartRemove.pending]: (state) => {
      state.loading = true;
    },
    [CartRemove.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        id,
        total_items,
        subtotal,
        line_items,
        currency,
        discount,
        total_unique_items,
      } = action.payload.cart;
      state.id = id;
      state.total_items = total_items;
      state.subtotal = subtotal;
      state.line_items = line_items;
      state.currency = currency;
      state.discount = discount;
      state.unique_items = total_unique_items;
    },
    [CartRemove.rejected]: (state) => {
      state.loading = false;
    },
    [CartEmpty.pending]: (state) => {
      state.loading = true;
    },
    [CartEmpty.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);
    },
    [CartEmpty.rejected]: (state) => {
      state.loading = true;
    },
  },
});

export default cartSlice.reducer;
