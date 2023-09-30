import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Link as MuiLink,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
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
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import {
  fetchAllProducts,
  fetchFilterProducts,
} from "../redux/reducers/productsReducer";

function Products() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [price, setPrice] = React.useState<number[]>([1, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const products = useSelector(
    (state: AppState) => state.products.filterProducts
  );
  const { category } = useSelector((state: AppState) => ({
    category: state.category.data,
  }));

  React.useEffect(() => {
    dispatch(
      fetchFilterProducts({
        offset,
        limit,
        price_min: price[0],
        price_max: price[1],
        categoryId: selectedCategory,
      })
    );
  }, [id, offset, limit, price, selectedCategory]);

  const breadcrumbs = [
    <MuiLink underline="hover" key="1" color="inherit" href="/">
      Home
    </MuiLink>,
    <Typography key="3" color="text.primary">
      {category?.name}
    </Typography>,
  ];

  const handlePrevPage = () => {
    setOffset((prev) => prev - limit);
  };
  const handleNextPage = () => {
    setOffset((prev) => prev + limit);
  };

  const handleChange = (e: SelectChangeEvent) => {
    setLimit(Number(e.target.value));
  };

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
        <BreadCrumb label={"products"} />
        <Typography variant="h4" color={"primary.main"} margin={"1rem 0rem"}>
          {category?.name}
        </Typography>
      </Box>
      <Grid container columns={12} spacing={4} sx={{ padding: "2rem 0rem" }}>
        <Grid item xs={12} md={4} lg={3}>
          <SidebarFilter
            price={price}
            setPrice={setPrice}
            setSelectedCategory={setSelectedCategory}
          />
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
              <Typography variant="h6">
                Showing {offset} - {offset + limit} items
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography variant="h6">Show </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={limit.toString()}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Grid container spacing={3} columns={12} sx={{ marginTop: "2rem" }}>
            {products.map((product) => {
              return <Product product={product} />;
            })}
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              margin: "2rem 0rem",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              disabled={!Boolean(offset)}
              startIcon={<ArrowLeft />}
              onClick={handlePrevPage}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              disabled={products.length === limit ? false : true}
              endIcon={<ArrowRight />}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Products;
