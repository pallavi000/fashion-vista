import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// types
import { OrderState } from "../../@types/reduxState";
import { TOrder, TOrderData } from "../../@types/order";

//axios
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";

//hwlpers
import { showApiErrorToastr } from "../../utils/helper";

// initail state
const initialState: OrderState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TOrder>) => {
      return {
        ...state,
        data: [action.payload, ...state.data],
        isLoading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    });
    builder.addCase(
      getOrders.fulfilled,
      (state, action: PayloadAction<TOrder[]>) => {
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          error: null,
        };
      }
    );
    builder.addCase(getOrders.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(createOrder.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    });
    builder.addCase(
      createOrder.fulfilled,
      (state, action: PayloadAction<TOrder>) => {
        return {
          ...state,
          data: [action.payload, ...state.data],
          isLoading: false,
          error: null,
        };
      }
    );
    builder.addCase(createOrder.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });
  },
});

export const getOrders = createAsyncThunk("getOrders", async () => {
  try {
    const response = await axiosInstance.get("/orders");
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    showApiErrorToastr(error);
    throw error;
  }
});

export const createOrder = createAsyncThunk(
  "createOrder",
  async (data: TOrderData) => {
    try {
      const response = await axiosInstance.post("/orders", data);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

// actions
export const { addOrder } = orderSlice.actions;
// redux persist reducer
export default orderSlice.reducer;
