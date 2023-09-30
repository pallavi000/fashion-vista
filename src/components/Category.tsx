import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { TCategory } from "../@types/category";
import { Link } from "react-router-dom";

function Category({ category }: { category: TCategory }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box sx={{ height: "100%", position: "relative" }}>
        <Link to={`/category/${category.id}/products`}>
          <img
            src={category.image}
            height={250}
            style={{
              objectFit: "cover",
              width: "100%",
              borderRadius: "0.5rem",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              top: "80%",
              transform: "translate(50%,-50%)",
              right: "50%",
              background: "rgba(0,0,0,0.4)",
              width: "100%",
              textAlign: "center",
            }}
          >
            {category.name}
          </Typography>
        </Link>
      </Box>
    </Grid>
  );
}

export default Category;
