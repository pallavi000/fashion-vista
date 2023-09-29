import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";
import { ProductState } from "../../@types/reduxState";

const initialState: ProductState = {
  data: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
  },
});

export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async ({ id }: { id: number }) => {
    try {
      const result = await axiosInstance.get(`/products/${id}`);
      console.log(result.data);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export default productSlice.reducer;
