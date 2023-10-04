import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import { Box, Button, Container, Grid, Typography } from "@mui/material";

// reducers
import { fetchAllProducts } from "../redux/reducers/productsReducer";

// images
import Product from "../components/Product";
import Category from "../components/Category";
import BrandImg1 from "../images/brand1.png";
import BrandImg2 from "../images/brand2.png";
import BrandImg3 from "../images/brand3.png";
import BrandImg4 from "../images/brand4.png";
import BrandImg5 from "../images/brand5.png";
import BrandImg6 from "../images/brand6.png";

// components
import Brand from "../components/Brand";
import SkeletonProductCard from "../components/skeleton/SkeletonProductCard";

// types
import { TProduct } from "../@types/product";

function Home() {
  // app dispatch
  const dispatch = useAppDispatch();

  // products state
  const { products, isLoading } = useSelector((state: AppState) => ({
    products: state.products.data,
    isLoading: state.products.isLoading,
  }));

  // categories state
  const categories = useSelector((state: AppState) => state.categories.data);

  // products fetch/display limit
  const offset = 0;
  const limit = 10;

  // brands
  const brands = [
    BrandImg1,
    BrandImg2,
    BrandImg3,
    BrandImg4,
    BrandImg5,
    BrandImg6,
  ];

  // fetch products
  useEffect(() => {
    dispatch(fetchAllProducts({ offset, limit }));
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            width: "100%",
            height: "auto",
          }}
        >
          <img src="./images/hero.png" height={"auto"} width={"100%"} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "3rem 0rem",
          }}
        >
          <Typography variant="h4">New Arrivals</Typography>
          <Button>
            <Link to="/products">View All</Link>
          </Button>
        </Box>
        <Grid container spacing={6} columns={12}>
          {isLoading && !products?.length
            ? [...Array(5)].map((_, index) => (
                <SkeletonProductCard key={index} />
              ))
            : products?.slice(0, 8).map((product: TProduct) => {
                return <Product key={product.id} product={product} />;
              })}
        </Grid>
      </Container>
      <Box
        bgcolor={"primary.main"}
        padding={"2rem 2rem 6rem 2rem"}
        color="primary.contrastText"
      >
        <Typography variant="h4" padding={"2rem 0rem"}>
          HandPicked Collection
        </Typography>
        <Grid container spacing={6} columns={12}>
          {categories.slice(0, 4).map((category, index) => {
            return <Category category={category} key={category.id} />;
          })}
        </Grid>
      </Box>
      <Box padding={"4rem 2rem"}>
        <Typography variant="h4" padding={"2rem 0rem"}>
          Shop By Brand
        </Typography>
        <Grid container spacing={3} columns={12}>
          {brands.map((brand, index) => {
            return <Brand key={index} brand={brand} />;
          })}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
