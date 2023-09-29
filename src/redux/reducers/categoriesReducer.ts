import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";
import { CategoriesState } from "../../@types/reduxState";

const initialState: CategoriesState = {
  data: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
  },
});

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  try {
    const result = await axiosInstance.get(`/categories`);
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

export default categoriesSlice.reducer;
