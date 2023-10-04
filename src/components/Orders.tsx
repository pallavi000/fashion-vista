import React from "react";
//redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

// MUI
import { Alert } from "@mui/material";

// components
import OrderItem from "./OrderItem";

// types
import { TOrder } from "../@types/order";

function Orders() {
  // orders state
  const orders = useSelector((state: AppState) => state.orders.data);

  return (
    <>
      {orders.length ? (
        orders.map((order: TOrder) => {
          return <OrderItem key={order.orderId} order={order} />;
        })
      ) : (
        <Alert severity="error" sx={{ marginTop: "2rem" }}>
          No orders yet! Your orders will be shown here.
        </Alert>
      )}
    </>
  );
}

export default Orders;
