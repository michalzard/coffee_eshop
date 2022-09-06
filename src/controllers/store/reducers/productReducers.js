import {createAsyncThunk} from "@reduxjs/toolkit";
import { fetchAllProducts } from "../../eccommerce/products";

export const getAllProducts = createAsyncThunk("Products/All",async ()=>{
    return await fetchAllProducts();
})