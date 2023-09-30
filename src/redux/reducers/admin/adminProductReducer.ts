import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ProductsState } from "../../../@types/reduxState";
import axiosInstance from "../../../utils/AxiosInstance";

const initialState: ProductsState = {
  data: [],
  filterProducts: [],
  searchProducts: [],
  isLoading: false,
  error: null,
};

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminAllProducts.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
  },
});

export const fetchAdminAllProducts = createAsyncThunk(
  "fetchAdminAllProducts",
  async () => {
    try {
      const result = await axiosInstance.get(`/products`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const {} = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
