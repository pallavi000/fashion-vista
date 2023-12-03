import React, { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import { Button, Container, Grid, Stack, Typography } from "@mui/material";

// icons
import { Add } from "@mui/icons-material";

// components
import SkeletonCategoryCard from "../../components/skeleton/SkeletonCategoryCard";
import AdminSizeAddModal from "../../components/admin/sizes/AdminSizeAddModal";
import AdminSizeCard from "../../components/admin/sizes/AdminSizeCard";

// reducers
import { fetchAdminSizes } from "../../redux/reducers/admin/adminSizeReducer";
import { TSize } from "../../@types/size";

function AdminSizes() {
  const dispatch = useAppDispatch();

  // sizes states
  const { sizes, isLoading } = useSelector((state: AppState) => ({
    sizes: state.adminSizes.data,
    isLoading: state.adminSizes.isLoading,
  }));

  // new Size modal state
  const [isNewSizeModalOpen, setIsNewSizeModalOpen] = useState(false);

  // fetch sizes
  useEffect(() => {
    dispatch(fetchAdminSizes());
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h6">Sizes</Typography>
        <Button
          onClick={() => setIsNewSizeModalOpen(true)}
          size="small"
          variant="contained"
          startIcon={<Add />}
        >
          New Size
        </Button>
      </Stack>

      <AdminSizeAddModal
        isOpen={isNewSizeModalOpen}
        setIsOpen={setIsNewSizeModalOpen}
      />

      <Grid container spacing={3}>
        {isLoading && !sizes.length
          ? [...Array(8)].map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <SkeletonCategoryCard key={index} />
              </Grid>
            ))
          : sizes.map((size: TSize, index) => (
              <Grid key={size._id} item xs={6} sm={4} md={3}>
                <AdminSizeCard size={size} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}

export default AdminSizes;
