import { TCategory } from "./category";

export type TProduct = {
  _id: number;
  name: string;
  price: number;
  description: string;
  category: TCategory;
  images: string[];
  creationAt?: string;
  updatedAt?: string;
};

export interface ProductInputs {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  image: string;
}

export interface ProductInputsData extends ProductInputs {
  _id: number;
  images: string[];
}
