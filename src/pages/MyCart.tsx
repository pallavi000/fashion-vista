import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import BreadCrumb from "../utils/BreadCrumb";
import Img from "../images/img1.png";

function MyCart() {
  const items = [1, 2, 3];
  return (
    <Container maxWidth="xl" sx={{ padding: "4rem 0rem" }}>
      <Box>
        <BreadCrumb product={"Cart"} />
      </Box>
      <Typography
        variant="h4"
        color={"primary.main"}
        sx={{ padding: "2rem 0rem" }}
      >
        My Cart
      </Typography>
      <Grid container columns={12} spacing={3}>
        <Grid item xs={12} md={7}>
          <Grid container columns={12} spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h5">Product Name</Typography>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Price</Typography>
                <Typography variant="h5">Qty</Typography>
                <Typography variant="h5">SubTotal</Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ margin: "1rem 0rem" }} />
          {items.map((item, index) => {
            return (
              <Grid container columns={12} margin={"0.8rem 0rem"}>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Box sx={{ height: "100px", width: "100px" }}>
                    <img
                      src={Img}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.06rem",
                    }}
                  >
                    <Typography variant="body1">Product name</Typography>
                    <Typography variant="body2">Product Category</Typography>
                    <Typography variant="body2">Qty-1</Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1">$54</Typography>
                  <Typography variant="body1">1</Typography>
                  <Typography variant="body1">$54</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12} md={5}></Grid>
      </Grid>
    </Container>
  );
}

export default MyCart;
