import { TCart } from "./cart";
import { TCategory } from "./category";
import { TProduct } from "./product";
import { TUser } from "./user";

export type ProductState = {
  data: TProduct | null;
  isLoading: boolean;
  error: string | null;
};

export type ProductsState = {
  data: TProduct[];
  isLoading: boolean;
  error: string | null;
};

export type CategoriesState = {
  data: TCategory[];
  isLoading: boolean;
  error: string | null;
};

export type CategoryState = {
  data: TCategory | null;
  products: TProduct[];
  isLoading: boolean;
  error: string | null;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: TUser | null;
  error: string | null;
  isLoading: boolean;
  access_token: string | null;
  refresh_token: string | null;
};

export type CartState = {
  items: TCart[];
  totalPrice: number;
  totalQuantity: number;
  shippingId: number | null;
  isLoading: boolean;
  error: string | null;
};
