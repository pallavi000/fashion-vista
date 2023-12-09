import React from "react";
import { Link } from "react-router-dom";

// MUI
import { Avatar, Box, Grid, Typography } from "@mui/material";

// types
import { TProduct } from "../@types/product";

// component props type
type ProductProps = { product: TProduct };

function Product({ product }: ProductProps) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box sx={{ height: "412px" }}>
        <Link to={`/product-detail/${product._id}`}>
          <Avatar
            src={product.image}
            alt={product.name}
            variant="square"
            sx={{ height: 250, width: "auto" }}
          />

          {/* <img
            src={product.image}
            alt={product.name}
            height={250}
            style={{
              objectFit: "cover",
              width: "100%",
              borderRadius: "0.5rem",
            }}
          /> */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Box>
              <Typography variant="body1">{product.name}</Typography>
              <Typography variant="body2" color={"#626262"}>
                {product.category?.name}
              </Typography>
              <Typography variant="h6">${product.price}</Typography>
            </Box>
            {/* <Box>
              <FavoriteBorder />
            </Box> */}
          </Box>
        </Link>
      </Box>
    </Grid>
  );
}

export default Product;
