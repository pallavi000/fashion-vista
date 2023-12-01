import { TProduct } from "./product";

export type TCart = {
  product: TProduct;
  quantity: number;
  user: string;
  total: number;
};

export type TCartInput = {
  product: string;
  quantity: number;
  user: string;
  total: number;
};
