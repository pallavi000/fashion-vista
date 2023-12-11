import React, { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

// icons
import { Add, Search } from "@mui/icons-material";

// components
import SkeletonCategoryCard from "../../components/skeleton/SkeletonCategoryCard";

// reducers
import {
  deleteAdminBanner,
  fetchAdminBanners,
} from "../../redux/reducers/admin/adminBannerReducer";

import CustomModal from "../../components/CustomModal";
import TableOptionPopover from "../../components/TableOptionPopover";

import { TBanner } from "../../@types/banner";

import BannerForm from "../../components/admin/banners/BannerForm";
import BannerTableBody from "../../components/admin/banners/BannerTableBody";

function AdminBanners() {
  const dispatch = useAppDispatch();

  // modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBanner, setActiveBanner] = useState<null | TBanner>(null);

  // pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // popover menu states
  const [popoverEle, setPopOverEle] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  // banners states
  const { banners, isLoading } = useSelector((state: AppState) => ({
    banners: state.adminBanner.data,
    isLoading: state.adminBanner.isLoading,
  }));

  // pagination handlers
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // fetch banners
  useEffect(() => {
    dispatch(fetchAdminBanners());
  }, []);

  // popover open/close handler
  const handlePopoverOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    banner: TBanner
  ) => {
    setActiveBanner(banner);
    setPopOverEle(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOverEle(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setActiveBanner(null);
  };

  // popover menu item click handler
  const handleBannerEditClick = () => {
    handlePopoverClose();
    setIsModalOpen(true);
  };

  const handleBannerDeleteClick = async () => {
    if (activeBanner)
      await dispatch(deleteAdminBanner({ id: activeBanner._id }));
    handlePopoverClose();
    setActiveBanner(null);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h6">Banners</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsModalOpen(true)}
        >
          New Banner
        </Button>
      </Stack>

      {/* create/edit banner modal */}
      <CustomModal
        modalTitle="Create Banner"
        isOpen={isModalOpen}
        onClose={() => handleModalClose()}
        component={
          <BannerForm
            banner={activeBanner}
            handleClose={() => handleModalClose()}
          />
        }
      />

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Banner</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Banner related Page</TableCell>
                <TableCell>Created at</TableCell>

                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners
                .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                .map((banner) => {
                  return (
                    <BannerTableBody
                      banner={banner}
                      key={banner._id}
                      handlePopoverOpen={handlePopoverOpen}
                    />
                  );
                })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  count={banners.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
      <TableOptionPopover
        anchorEl={popoverEle}
        handleEdit={handleBannerEditClick}
        handleDelete={handleBannerDeleteClick}
        handleCloseMenu={handlePopoverClose}
      />
    </Container>
  );
}

export default AdminBanners;
