import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

// icons
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

// types
import { TProduct } from "../@types/product";
import { ProductState } from "../@types/reduxState";

// components
import Product from "../components/Product";
import BreadCrumb from "../components/Breadcrumb";

// reducers
import { fetchProductById } from "../redux/reducers/productReducer";
import { addToCart } from "../redux/reducers/cartReducer";

// helpers
import { showCustomToastr } from "../utils/helper";
import SkeletonProductDetail from "../components/skeleton/SkeletonProductDetail";

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();

  // app dispatch
  const dispatch = useAppDispatch();

  // current product id
  const productId = Number(params.id);

  // current product state
  const {
    data: product,
    isLoading,
    error,
  }: ProductState = useSelector((state: AppState) => ({
    data: state.product.data,
    isLoading: state.product.isLoading,
    error: state.product.error,
  }));

  // products state
  const products: TProduct[] | [] = useSelector(
    (state: AppState) => state.products.data
  );

  // auth state
  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated
  );

  // get current product
  useEffect(() => {
    dispatch(fetchProductById({ id: productId }));
  }, [productId]);

  // handle add to cart
  const handleCart = () => {
    isAuthenticated && product
      ? dispatch(addToCart(product)) &&
        showCustomToastr("Item added to cart.", "success")
      : navigate("/sign-in");
  };

  return (
    <Container maxWidth={"xl"} sx={{ padding: "2rem 0rem" }}>
      {" "}
      <BreadCrumb label={product?.title || "Product Detail"} />
      {isLoading && !product ? (
        <SkeletonProductDetail />
      ) : (
        <Grid
          container
          justifyContent={"space-between"}
          spacing={6}
          sx={{ padding: "2rem 0rem" }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                justifyContent: "center",
              }}
            >
              <Box sx={{ height: "500px" }}>
                <img
                  src={product?.images[0]}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Box>
                <Typography variant="h4">{product?.title}</Typography>
                <Chip
                  label={product?.category.name}
                  size="small"
                  sx={{ marginTop: "0.5rem", marginBottom: "1rem" }}
                />

                <Typography variant="h6">{product?.description}</Typography>
              </Box>

              <Rating name="read-only" value={3} readOnly />
              <Typography variant="h4" marginBottom={"1rem"}>
                {" "}
                ${product?.price}
              </Typography>
            </Box>
            <Divider />
            {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <Typography variant="h6">Quantity : </Typography>
            <Box
              sx={{
                display: "flex",
                border: "1px solid ",
                borderRadius: "5px",
                padding: "0.06rem 0.7rem",
                gap: "0.7rem",
              }}
            >
              <Typography variant="h6">-</Typography>
              <Typography variant="h6">1</Typography>
              <Typography variant="h6">+</Typography>
            </Box>
          </Box> */}
            <Grid container spacing={3} columns={12} marginTop={"2rem"}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  sx={{ width: "100%", padding: "1rem" }}
                  onClick={handleCart}
                >
                  <ShoppingBagOutlinedIcon
                    fontSize={"small"}
                    sx={{ marginRight: "1rem" }}
                  />
                  Add to Bag
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  sx={{ width: "100%", padding: "1rem" }}
                >
                  <FavoriteBorderOutlinedIcon
                    fontSize={"small"}
                    sx={{ marginRight: "1rem" }}
                  />{" "}
                  Add to Wishlist
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Typography
        variant="h4"
        padding={"3rem 0rem 2rem 0rem"}
        color={"primary.main"}
      >
        Related Products
      </Typography>
      <Grid container spacing={6} columns={12}>
        {products.slice(0, 4).map((product: TProduct) => {
          return <Product key={product.id} product={product} />;
        })}
      </Grid>
    </Container>
  );
}

export default ProductDetail;
