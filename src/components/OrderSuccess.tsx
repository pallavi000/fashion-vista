import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <React.Fragment>
      <Box
        sx={{
          padding: "4rem 0rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircleOutline sx={{ fontSize: "5rem" }} color="success" />
        <Typography variant="h4">Thankyou for your purchase</Typography>
        <Typography variant="body1">
          Your Order No is : <strong>000021</strong>
        </Typography>
        <Typography variant="body1">
          We will email you with order confirmation with details and tracking
          info.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link to={"/"}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "success.dark",
                "&:hover": {
                  bgcolor: "success.darker",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Link>
          <Link to={"/account/orders"}>
            <Button variant="outlined">View Orders</Button>
          </Link>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default OrderSuccess;
