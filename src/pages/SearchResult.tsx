import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// redux
import { AppState, useAppDispatch } from "../redux/store";

//MUI
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

// icons
import GridViewIcon from "@mui/icons-material/GridView";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

// components
import Product from "../components/Product";
import BreadCrumb from "../components/Breadcrumb";
import SidebarFilter from "../components/SidebarFilter";
import SkeletonProductCard from "../components/skeleton/SkeletonProductCard";

// images
import BannerImg from "../images/category.png";

// reducers
import { fetchSearchProducts } from "../redux/reducers/productsReducer";

function SearchResult() {
  const location = useLocation();

  // query params
  const [searchQuery, setSearchQuery] = useState<string>("");

  // app dispatch
  const dispatch = useAppDispatch();

  // for pagination
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  // sidebar filter
  const [price, setPrice] = React.useState<number[]>([1, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  // products state
  const { products, isLoading } = useSelector((state: AppState) => ({
    products: state.products.searchProducts,
    isLoading: state.products.isLoading,
  }));
  // categories states
  const { category } = useSelector((state: AppState) => ({
    category: state.category.data,
  }));

  // search query param
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  // search products fetch
  React.useEffect(() => {
    if (searchQuery) {
      dispatch(
        fetchSearchProducts({
          query: searchQuery,
          price_min: price[0],
          price_max: price[1],
          categoryId: selectedCategory,
        })
      );
    }
  }, [searchQuery, price, selectedCategory]);

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
            {isLoading && !products?.length
              ? [...Array(5)].map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))
              : products?.slice(0, 8).map((product) => {
                  return <Product key={product.id} product={product} />;
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

export default SearchResult;
