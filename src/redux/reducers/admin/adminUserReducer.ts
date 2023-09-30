import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserStates } from "../../../@types/reduxState";
import axiosInstance from "../../../utils/AxiosInstance";

const initialState: UserStates = {
  data: [],
  isLoading: false,
  error: null,
};

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
  },
});

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    const result = await axiosInstance.get(`/users`);
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error;
  }
});

export default adminUserSlice.reducer;
