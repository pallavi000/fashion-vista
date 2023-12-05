import { TUser } from "./user";

export type TAddress = {
  _id: string;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  user: TUser;
};
