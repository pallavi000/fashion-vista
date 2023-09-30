import { Add, Search } from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import AdminCategoryCard from "../../components/admin/categories/AdminCategoryCard";
import { fetchAdminCategories } from "../../redux/reducers/admin/adminCategoryReducer";
import AdminCategoryAddModal from "../../components/admin/categories/AdminCategoryAddModal";

function AdminCategories() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const categories = useSelector(
    (state: AppState) => state.adminCategories.data
  );

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h6">Categories</Typography>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="small"
          variant="contained"
          startIcon={<Add />}
        >
          New Category
        </Button>
      </Stack>
      <AdminCategoryAddModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid key={category.id} item xs={12} sm={6} md={3}>
            <AdminCategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AdminCategories;
