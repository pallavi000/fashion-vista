import React from "react";

// MUI
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

// types
import { TOrder } from "../@types/order";
import { TCart } from "../@types/cart";

// component props type
type OrderItemItemProps = {
  order: TOrder;
  item: TCart;
};

function OrderItemItem({ order, item }: OrderItemItemProps) {
  return (
    <Grid container columns={12} margin={"0.8rem 0rem"}>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Box sx={{ height: "75px", width: "75px" }}>
          <img
            src={item.product.images[0]}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              borderRadius: "0.3rem",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="caption">{item.product.title}</Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={9}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption">{order.orderId}</Typography>
        <Typography variant="caption">{order.orderDate}</Typography>
        <Typography variant="caption">${item.product.price}</Typography>
        <Typography variant="caption">{item.quantity}</Typography>
        <Typography variant="caption">
          ${item.quantity * item.product.price}
        </Typography>
        <Typography variant="caption">{order.paymentMethod}</Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderColor: "greenyellow" }}
        >
          {order.deliveryStatus}
        </Button>
      </Grid>
    </Grid>
  );
}

export default OrderItemItem;
