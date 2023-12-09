export type TCategory = {
  _id: string;
  name: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CategoryInputs = {
  name: string;
  image: string;
};
