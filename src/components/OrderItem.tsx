import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Img from "../images/img1.png";
import { TOrder } from "../@types/order";

function OrderItem({ order }: { order: TOrder }) {
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
          {order?.items?.map((item, index) => {
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
                    <Typography variant="caption">
                      {item.product.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "gray",
                      }}
                    >
                      {item.product.category.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "gray",
                      }}
                    >
                      {item.quantity}
                    </Typography>
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
                  <Typography variant="caption">
                    ${item.product.price}
                  </Typography>
                  <Typography variant="caption">{item.quantity}</Typography>
                  <Typography variant="caption">
                    ${item.quantity * item.product.price}
                  </Typography>
                  <Typography variant="caption">
                    {order.paymentMethod}
                  </Typography>
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
          })}
        </Grid>
      </Grid>
      <Divider sx={{ margin: "2rem 0rem 3rem 0rem" }} />
    </>
  );
}

export default OrderItem;
