import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Input,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Img1 from "../images/img1.png";
import { useSelector } from "react-redux";
import { TProduct } from "../@types/product";
import Product from "../components/Product";
import { AppState, useAppDispatch } from "../redux/store";
import { ProductState } from "../@types/reduxState";
import { fetchProductById } from "../redux/reducers/productReducer";
import { addToCart } from "../redux/reducers/cartReducer";

function ProductDetail() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const productId = Number(params.id);

  const products: TProduct[] | [] = useSelector(
    (state: AppState) => state.products.data
  );
  const {
    data: product,
    isLoading,
    error,
  }: ProductState = useSelector((state: AppState) => ({
    data: state.product.data,
    isLoading: state.product.isLoading,
    error: state.product.error,
  }));
  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(fetchProductById({ id: productId }));
  }, [productId]);

  const handleCart = () => {
    isAuthenticated && product
      ? dispatch(addToCart(product))
      : navigate("/sign-in");
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      {product?.title}
    </Typography>,
  ];

  return (
    <Container maxWidth={"xl"} sx={{ padding: "2rem 0rem" }}>
      {" "}
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Grid
        container
        justifyContent={"space-between"}
        spacing={6}
        sx={{ padding: "2rem 0rem" }}
      >
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            <Box sx={{ height: "600px", width: "600px" }}>
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
        <Grid item xs={6}>
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
          {/* <Grid container spacing={3} alignItems={"center"} marginTop={"1rem"}>
            <Grid item xs={4}>
              <Typography variant="h6">Delivery Details</Typography>
              <Typography variant="body2">
                Check estimated delivery date/pickup option.
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: "#E5E5E5",
                  padding: "0.5rem",
                  color: "secondary.contrastText",
                }}
              >
                <Input
                  placeholder="Apply valid pincode"
                  sx={{
                    outline: 0,
                    border: 0,
                    "&::before": { borderBottom: "0" },
                    "&::after": { borderBottom: "0" },
                    "&:hover": { borderBottom: "0" },
                  }}
                />
                <Button variant="text">Check</Button>
              </Box>
            </Grid>
          </Grid> */}
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
      <Typography
        variant="h4"
        padding={"3rem 0rem 2rem 0rem"}
        color={"primary.main"}
      >
        Related Products
      </Typography>
      <Grid container spacing={6} columns={12}>
        {products.slice(0, 4).map((product: TProduct) => {
          return <Product product={product} />;
        })}
      </Grid>
    </Container>
  );
}

export default ProductDetail;
