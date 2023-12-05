import { TCategory } from "./category";
import { TSize } from "./size";

export type TProduct = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: TCategory;
  size: TSize;
  image: string;
  creationAt?: string;
  updatedAt?: string;
};

export interface ProductInputs {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  size: string;
}

export interface ProductInputsData extends ProductInputs {
  _id: string;
}
