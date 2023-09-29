import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";
import { CategoryState } from "../../@types/reduxState";
import { TCategory } from "../../@types/category";
import { TProduct } from "../../@types/product";

const initialState: CategoryState = {
  data: null,
  products: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<TCategory>) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProductsByCategory.fulfilled,
      (state, action: PayloadAction<TProduct[]>) => {
        return {
          ...state,
          products: action.payload,
        };
      }
    );
  },
});

export const fetchProductsByCategory = createAsyncThunk(
  "fetchProductsByCategory",
  async ({
    id,
    offset,
    limit,
    price_min,
    price_max,
  }: {
    id: number;
    offset: number;
    limit: number;
    price_min: number;
    price_max: number;
  }) => {
    try {
      const result = await axiosInstance.get(
        `/categories/${id}/products?offset=${offset}&limit=${limit}&price_min=${price_min}&price_max=${price_max}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
