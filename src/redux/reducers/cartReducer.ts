import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { cartPersistConfig } from "../../utils/reduxPersistConfig";

// types
import { CartState } from "../../@types/reduxState";
import { TCart } from "../../@types/cart";
import { TProduct } from "../../@types/product";

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
    addToCart: (state, action: PayloadAction<TProduct>) => {
      const productIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (productIndex != -1) {
        state.items[productIndex].quantity++;
      } else {
        const newCartItem: TCart = {
          quantity: 1,
          product: action.payload,
        };
        state.items.push(newCartItem);
      }
      state.totalQuantity++;
      state.totalPrice += action.payload.price;
    },

    removeFromCart: (state, action: PayloadAction<TProduct>) => {
      const productIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (productIndex != -1) {
        state.totalQuantity =
          state.totalQuantity - state.items[productIndex].quantity;
        state.totalPrice =
          state.totalPrice -
          state.items[productIndex].product.price *
            state.items[productIndex].quantity;
        state.items.splice(productIndex, 1);
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

// actions
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
// redux persist reducer
export default persistReducer(cartPersistConfig, cartSlice.reducer);
