import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
  },
  reducers: {
    fetchProducts: (state, action) => {
      state.products.push(...action.payload);
    },
  },
});

export const { fetchProducts } = productSlice.actions;

export default productSlice.reducer;
