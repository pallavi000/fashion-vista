import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState, useAppDispatch } from "../redux/store";
import {
  fetchProductsByCategory,
  setCategory,
} from "../redux/reducers/categoryReducer";
import { TProduct } from "../@types/product";
import Product from "../components/Product";
import BreadCrumb from "../components/Breadcrumb";
import SidebarFilter from "../components/SidebarFilter";
import GridViewIcon from "@mui/icons-material/GridView";
import BannerImg from "../images/category.png";

function CategoryProducts() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const categories = useSelector((state: AppState) => state.categories.data);
  const { category, products } = useSelector((state: AppState) => ({
    category: state.category.data,
    products: state.category.products,
  }));

  React.useEffect(() => {
    dispatch(fetchProductsByCategory({ id: Number(id) }));
  }, [id]);

  React.useEffect(() => {
    if (categories.length) {
      const foundCategory = categories.find((cat) => cat.id === Number(id));
      if (foundCategory) dispatch(setCategory(foundCategory));
    }
  }, [categories, id]);

  const breadcrumbs = [
    <MuiLink underline="hover" key="1" color="inherit" href="/">
      Home
    </MuiLink>,
    <Typography key="3" color="text.primary">
      {category?.name}
    </Typography>,
  ];

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 0rem" }}>
      <Box sx={{ height: "350px", width: "100%" }}>
        <img
          src={BannerImg}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
        />
      </Box>
      <Box sx={{ margin: "2rem 0rem" }}>
        <BreadCrumb label={category?.name || ""} />
        <Typography variant="h4" color={"primary.main"} margin={"1rem 0rem"}>
          {category?.name}
        </Typography>
      </Box>
      <Grid container columns={12} spacing={4} sx={{ padding: "2rem 0rem" }}>
        <Grid item xs={12} md={4} lg={3}>
          <SidebarFilter />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <GridViewIcon />
              <Typography variant="h6">Showing 1-20 of 45 items</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography variant="h6">To Show : </Typography>

              <Typography>0</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography variant="h6">Short by : </Typography>
              <GridViewIcon />
            </Box>
          </Box>
          <Grid container spacing={3} columns={12} sx={{ marginTop: "2rem" }}>
            {products.slice(0, 16).map((product) => {
              return <Product product={product} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CategoryProducts;
