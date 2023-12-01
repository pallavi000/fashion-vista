import { TCategory } from "./category";

export type TProduct = {
  _id: string;
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
  categoryId: string;
  image: string;
}

export interface ProductInputsData extends ProductInputs {
  _id: string;
  images: string[];
}
