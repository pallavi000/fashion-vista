import { TCategory } from "./category";

export type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: TCategory;
  images: string[];
};

export interface ProductInputs {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  image: string;
}

export interface ProductInputsData extends ProductInputs {
  id: number;
  images: string[];
}
