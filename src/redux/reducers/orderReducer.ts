import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartState, OrderState } from "../../@types/reduxState";
import { TCart } from "../../@types/cart";
import { TProduct } from "../../@types/product";
import { persistReducer } from "redux-persist";
import {
  cartPersistConfig,
  orderPersistConfig,
} from "../../utils/reduxPersistConfig";
import { TOrder } from "../../@types/order";

const initialState: OrderState = {
  data: [],
  isLoading: false,
  error: null,
};

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
});

export const { addOrder } = orderSlice.actions;
export default persistReducer(orderPersistConfig, orderSlice.reducer);
