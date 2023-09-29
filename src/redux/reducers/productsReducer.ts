import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { ProductsState } from "../../@types/reduxState";

const initialState: ProductsState = {
  data: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
  },
});

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async ({ offset, limit }: { offset: number; limit: number }) => {
    try {
      const result = await axiosInstance.get(
        `/products?offset=${offset}&limit=${limit}`
      );
      return result.data;
    } catch (error) {}
  }
);

export const {} = productsSlice.actions;

export default productsSlice.reducer;
