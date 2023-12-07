import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
  ButtonGroup,
} from "@mui/material";

// icons
import GridViewIcon from "@mui/icons-material/GridView";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

// components
import Product from "../components/Product";
import BreadCrumb from "../components/Breadcrumb";
import SidebarFilter from "../components/SidebarFilter";
import SkeletonProductCard from "../components/skeleton/SkeletonProductCard";
import BannerContainer from "../components/BannerContainer";

// reducers
import { fetchSearchProducts } from "../redux/reducers/productsReducer";
import CustomPagination from "../components/CustomPagination";

function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // query params
  const [searchQuery, setSearchQuery] = useState<string>("");

  // app dispatch
  const dispatch = useAppDispatch();

  // for pagination
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);

  // sidebar filter
  const [price, setPrice] = React.useState<number[]>([1, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // products state
  const { products, isLoading, totalPages } = useSelector(
    (state: AppState) => ({
      products: state.products.data,
      isLoading: state.products.isLoading,
      totalPages: state.products.totalPages,
    })
  );
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
    } else {
      navigate("/not-found");
    }
  }, [location]);

  // search products fetch
  React.useEffect(() => {
    if (searchQuery) {
      dispatch(
        fetchSearchProducts({
          pageNo,
          perPage,
          query: searchQuery,
          price_min: price[0],
          price_max: price[1],
          categoryId: selectedCategory,
        })
      );
    }
  }, [perPage, pageNo, searchQuery, price, selectedCategory]);

  const handleChange = (e: SelectChangeEvent) => {
    setPerPage(Number(e.target.value));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNo(value);
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 1rem" }}>
      <BannerContainer />
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
                Showing {pageNo} - {pageNo + perPage} items
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography variant="h6">Show </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={perPage.toString()}
                  onChange={handleChange}
                >
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Grid container spacing={3} columns={12} sx={{ marginTop: "2rem" }}>
            {isLoading
              ? [...Array(perPage)].map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))
              : products.map((product) => {
                  return <Product key={product._id} product={product} />;
                })}
          </Grid>
          <CustomPagination
            currentPage={pageNo}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchResult;
