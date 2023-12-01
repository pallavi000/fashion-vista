export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs extends LoginInputs {
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
  avatar: string;
}

export type TUserRole = "USER" | "ADMIN";

export type TUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: TUserRole | null;
  avatar: string;
  createdAt: string;
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
