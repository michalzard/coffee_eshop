import { createSlice } from "@reduxjs/toolkit";
import { CartRetrieve } from "../store/reducers/cartReducers";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    id: "",
    total_items: 0,
    subtotal: {},
    items: [],
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
      const { id, total_items, subtotal, line_items, currency, discount } = action.payload;
      state.id = id;
      state.total_items = total_items;
      state.subtotal = subtotal;
      state.items = line_items;
      state.currency = currency;
      state.discount = discount;
    },
    [CartRetrieve.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default cartSlice.reducer;
