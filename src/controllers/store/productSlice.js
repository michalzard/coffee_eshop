import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./reducers/productReducers";

const productSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
    loading: false,
    error: "",
  },
  extraReducers: {
    //Product/All
    [getAllProducts.pending]: (state) => {
      state.loading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products.push(...action.payload); //iterate over array received in payload
    },
    [getAllProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
