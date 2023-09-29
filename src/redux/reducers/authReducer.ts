import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../@types/reduxState";
import axiosInstance from "../../utils/AxiosInstance";
import { persistReducer } from "redux-persist";
import { authPersistConfig } from "../../utils/reduxPersistConfig";
import { AppState } from "../store";
import { AxiosError } from "axios";
import { RegisterInputs } from "../../@types/user";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
  access_token: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        access_token: null,
        refresh_token: null,
        user: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        error: null,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.error.message || "",
      };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.error.message || "",
      };
    });
    builder.addCase(getCurrentUser.pending, (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
        error: null,
      };
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    });
  },
});

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const result = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data: RegisterInputs, { dispatch }) => {
    try {
      const result = await axiosInstance.post("/users", data);
      // login user
      dispatch(loginUser({ email: data.email, password: data.password }));
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (_, { getState }) => {
    try {
      const state = getState() as AppState;
      const accessToken = state.auth.access_token;
      if (!accessToken) {
        throw new Error("No access token available");
      }
      const result = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { password, ...userData } = result.data;
      return userData;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const { logoutUser } = authSlice.actions;
export default persistReducer(authPersistConfig, authSlice.reducer);
