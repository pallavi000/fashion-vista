import { FavoriteBorder } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { TProduct } from "../@types/product";
import { Link } from "react-router-dom";

function Product({ product }: { product: TProduct }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box sx={{ height: "412px" }}>
        <Link to={`/product-detail/${product.id}`}>
          <img
            src={product.images[0]}
            height={250}
            style={{
              objectFit: "cover",
              width: "100%",
              borderRadius: "0.5rem",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Box>
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body2" color={"#626262"}>
                {product.category?.name}
              </Typography>
              <Typography variant="h6">${product.price}</Typography>
            </Box>
            <Box>
              <FavoriteBorder />
            </Box>
          </Box>
        </Link>
      </Box>
    </Grid>
  );
}

export default Product;
