import { TAddress } from "./address";
import { TCart } from "./cart";
import { TProduct } from "./product";
import { TUser } from "./user";

export type TOrderInput = {
  orderId: string;
  total: number;
  orderDate: string;
  paymentMethod: string;
  items: TCart[];
  deliveryStatus: string;
};

export type TOrder = {
  _id: string;
  user: TUser;
  products: TProduct[];
  shipping: TAddress;
  payment: {
    method: "Credit Card" | "PayPal" | "Cash";
    status: "Paid" | "Pending" | "Refunded" | "Cancelled";
  };
  total: number;
};
