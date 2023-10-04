export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs extends LoginInputs {
  name: string;
  role: "customer" | "admin";
  avatar: string;
}

export type TAuthProps = {
  setPage?: Function;
  register?: any;
  errors?: any;
  isLoading: boolean;
  setValue?: Function;
  getValues?: Function;
};

export type TUser = {
  id: number;
  email: string;
  name: string;
  role: "customer" | "admin" | null;
  avatar: string;
  creationAt: string;
  updatedAt: string;
};

export type UserAddressInputs = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};
