import { Action, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";
import { TCategory } from "../../@types/category";
import { TProduct } from "../../@types/product";

type CategoryState = {
  data: TCategory[];
  products: TProduct[];
  loading: boolean;
  singleCategory: TCategory | null;
  error: string | null;
};

const initialState: CategoryState = {
  data: [],
  products: [],
  singleCategory: null,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      return {
        ...state,
        singleCategory: action.payload,
      };
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    });
  },
});

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
    try {
      const result = await axiosInstance.get(`/categories`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  "fetchCategoryById",
  async ({ id }: { id: number }) => {
    try {
      const result = await axiosInstance.get(`/categories/${id}`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "fetchProductsByCategory",
  async ({ id }: { id: number }) => {
    try {
      const result = await axiosInstance.get(`categories/${id}/products`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
