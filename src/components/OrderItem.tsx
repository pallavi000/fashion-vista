import React from "react";

// MUI
import { Box, Divider, Grid, Typography } from "@mui/material";

// type
import { TOrder } from "../@types/order";
import OrderItemItem from "./OrderItemItem";

// component props type
type OrderItemProps = { order: TOrder };

function OrderItem({ order }: OrderItemProps) {
  return (
    <>
      <Grid container columns={12} spacing={3}>
        <Grid item xs={12} md={12}>
          <Grid container columns={12} spacing={3}>
            <Grid item xs={3}>
              <Typography variant="caption">Items</Typography>
            </Grid>
            <Grid item xs={9}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="caption">Order No</Typography>
                <Typography variant="caption">Order Date</Typography>
                <Typography variant="caption">Price</Typography>
                <Typography variant="caption">Qty</Typography>
                <Typography variant="caption">SubTotal</Typography>
                <Typography variant="caption">Payment Method</Typography>
                <Typography variant="caption">Order Status</Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ margin: "0.5rem 0rem" }} />
          {order?.items?.map((item) => {
            return (
              <OrderItemItem
                key={`${order.orderId}-${item.product.id}`}
                order={order}
                item={item}
              />
            );
          })}
        </Grid>
      </Grid>
      <Divider sx={{ margin: "2rem 0rem 3rem 0rem" }} />
    </>
  );
}

export default OrderItem;
