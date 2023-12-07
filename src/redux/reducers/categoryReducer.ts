import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";

// types
import { CategoryState } from "../../@types/reduxState";
import { TCategory } from "../../@types/category";
import { TProduct } from "../../@types/product";

// initial states
const initialState: CategoryState = {
  data: null,
  isLoading: false,
  error: null,
};

// slice
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
  extraReducers: (builder) => {},
});

// ==============================================
// API Calls
// ==============================================

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
