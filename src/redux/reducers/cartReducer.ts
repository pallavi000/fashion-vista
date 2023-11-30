import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { cartPersistConfig } from "../../utils/reduxPersistConfig";

// types
import { CartState } from "../../@types/reduxState";
import { TCart } from "../../@types/cart";
import { TProduct } from "../../@types/product";
import axiosInstance from "../../utils/AxiosInstance";
import { showApiErrorToastr, showCustomToastr } from "../../utils/helper";
import { AxiosError } from "axios";

// initial states
const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  shippingId: null,
  isLoading: false,
  error: null,
};

// slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCart>) => {
      const productIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (productIndex !== -1) {
        state.items[productIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity += action.payload.quantity;
      state.totalPrice +=
        action.payload.product.price * action.payload.quantity;
    },

    removeFromCart: (state, action: PayloadAction<TProduct>) => {
      const productIndex = state.items.findIndex(
        (item) => item.product._id === action.payload._id
      );
      if (productIndex !== -1) {
        state.totalQuantity =
          state.totalQuantity - state.items[productIndex].quantity;
        state.totalPrice =
          state.totalPrice -
          state.items[productIndex].product.price *
            state.items[productIndex].quantity;
        state.items.splice(productIndex, 1);
      }
    },
    increaseCartItemQuantity: (state, action: PayloadAction<TCart>) => {
      const productIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (productIndex !== -1) {
        state.items[productIndex].quantity++;
        state.totalQuantity++;
        state.totalPrice += action.payload.product.price;
      }
    },
    decreaseCartItemQuantity: (state, action: PayloadAction<TCart>) => {
      const productIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (productIndex !== -1) {
        state.items[productIndex].quantity--;
        state.totalQuantity--;
        state.totalPrice -= action.payload.product.price;
      }
    },
    emptyCart: (state) => {
      return {
        ...state,
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
        shippingId: null,
        isLoading: false,
        error: null,
      };
    },
  },
});

export const addNewCart = createAsyncThunk(
  "addNewCart",
  async (data: TCart) => {
    try {
      const response = await axiosInstance.post("/carts", data);
      showCustomToastr("Cart Added successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

// actions
export const {
  addToCart,
  removeFromCart,
  emptyCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = cartSlice.actions;
// redux persist reducer
export default persistReducer(cartPersistConfig, cartSlice.reducer);
