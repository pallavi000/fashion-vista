import React, { useEffect } from "react";
import { AppState, useAppDispatch } from "../redux/store";
import { fetchAllProducts } from "../redux/reducers/productsReducer";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import Img1 from "../images/img1.png";
import Img2 from "../images/img2.png";
import Img3 from "../images/img3.png";
import Img4 from "../images/img4.png";
import Product from "../components/Product";
import Category from "../components/Category";
import BrandImg1 from "../images/brand1.png";
import BrandImg2 from "../images/brand2.png";
import BrandImg3 from "../images/brand3.png";
import BrandImg4 from "../images/brand4.png";
import BrandImg5 from "../images/brand5.png";
import BrandImg6 from "../images/brand6.png";
import Brand from "../components/Brand";
import { useSelector } from "react-redux";
import { TProduct } from "../@types/product";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useAppDispatch();
  const products: any = useSelector((state: AppState) => state.products.data);
  const categories = useSelector((state: AppState) => state.categories.data);
  const offset = 0;
  const limit = 10;

  const images = [Img1, Img2, Img3, Img4];
  const brands = [
    BrandImg1,
    BrandImg2,
    BrandImg3,
    BrandImg4,
    BrandImg5,
    BrandImg6,
  ];

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
          {products?.slice(0, 8).map((product: TProduct) => {
            return <Product product={product} />;
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
