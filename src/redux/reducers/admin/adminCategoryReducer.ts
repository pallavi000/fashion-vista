import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CategoriesState } from "../../../@types/reduxState";
import axiosInstance from "../../../utils/AxiosInstance";
import { CategoryInputs, TCategory } from "../../../@types/category";

const initialState: CategoriesState = {
  data: [],
  isLoading: false,
  error: null,
};

const adminCategorySlice = createSlice({
  name: "adminCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminCategories.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
    builder.addCase(addNewCategory.fulfilled, (state, action) => {
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    });
    builder.addCase(updateAdminCategory.fulfilled, (state, action) => {
      const categoryIndex = state.data.findIndex(
        (c) => c.id === action.payload.id
      );
      if (categoryIndex !== -1) {
        state.data[categoryIndex] = action.payload;
      }
    });
    builder.addCase(deleteAdminCategory.fulfilled, (state, action) => {
      return {
        ...state,
        data: state.data.filter((cat) => cat.id !== action.payload),
      };
    });
  },
});

export const fetchAdminCategories = createAsyncThunk(
  "fetchAdminCategories",
  async () => {
    try {
      const result = await axiosInstance.get(`/categories`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "addNewCategory",
  async (data: CategoryInputs) => {
    try {
      const response = await axiosInstance.post(`/categories`, data);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const updateAdminCategory = createAsyncThunk(
  "updateAdminCategory",
  async (data: TCategory) => {
    try {
      const response = await axiosInstance.put(`/categories/${data.id}`, data);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const deleteAdminCategory = createAsyncThunk(
  "deleteAdminCategory",
  async ({ id }: { id: number }) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      return id;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export default adminCategorySlice.reducer;
