import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { ProductsState } from "../../@types/reduxState";
import { AxiosError } from "axios";

const initialState: ProductsState = {
  data: [],
  searchProducts: [],
  filterProducts: [],
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
    builder.addCase(fetchFilterProducts.fulfilled, (state, action) => {
      return {
        ...state,
        filterProducts: action.payload,
      };
    });
    builder.addCase(fetchSearchProducts.fulfilled, (state, action) => {
      return {
        ...state,
        searchProducts: action.payload,
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
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const fetchFilterProducts = createAsyncThunk(
  "fetchFilterProducts",
  async ({
    offset,
    limit,
    price_min,
    price_max,
  }: {
    offset: number;
    limit: number;
    price_min: number;
    price_max: number;
  }) => {
    try {
      const result = await axiosInstance.get(
        `/products?offset=${offset}&limit=${limit}&price_min=${price_min}&price_max=${price_max}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "fetchSearchProducts",
  async ({
    query,
    price_min,
    price_max,
  }: {
    query: string;
    price_min: number;
    price_max: number;
  }) => {
    try {
      const result = await axiosInstance.get(
        `/products/?title=${query}&price_min=${price_min}&price_max=${price_max}`
      );
      console.log(result.data);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const {} = productsSlice.actions;

export default productsSlice.reducer;
