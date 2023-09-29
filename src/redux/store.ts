import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";

import productsReducer from "./reducers/productsReducer";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import categoryReducer from "./reducers/categoryReducer";

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDEfaultMiddleware) => getDEfaultMiddleware().concat(thunk),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
