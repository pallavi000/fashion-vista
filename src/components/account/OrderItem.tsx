import React from "react";

// MUI
import { TableCell, TableRow, Chip, Tooltip } from "@mui/material";

// type
import { TOrder } from "../../@types/order";

// components
import OrderItemItem from "./OrderItemItem";

// component props type
type OrderItemProps = { order: TOrder };

function OrderItem({ order }: OrderItemProps) {
  return (
    <>
      <TableRow>
        <TableCell rowSpan={order.products.length + 1}>
          <Tooltip title={order._id}>
            <Chip
              label={`#${order._id}`}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100px",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
      {order.products.map((product) => {
        return (
          <OrderItemItem
            key={`${order._id}-${product._id}`}
            order={order}
            product={product}
          />
        );
      })}
    </>
  );
}

export default OrderItem;
