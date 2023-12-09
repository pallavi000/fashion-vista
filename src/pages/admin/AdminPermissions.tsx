import React, { useEffect, useState } from "react";

// MUI
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Box,
  Checkbox,
  Stack,
  Button,
} from "@mui/material";

// icons
import { Add, Search } from "@mui/icons-material";
import { AppState, useAppDispatch } from "../../redux/store";
import {
  deletePermission,
  fetchPermissions,
} from "../../redux/reducers/admin/adminPermissionReducer";
import { useSelector } from "react-redux";
import PermissionTableBody from "../../components/admin/permission/PermissionTableBody";
import { TPermission } from "../../@types/permission";
import CustomModal from "../../components/CustomModal";
import PermissionForm from "../../components/admin/permission/PermissionForm";
import TableOptionPopover from "../../components/TableOptionPopover";

function AdminPermissions() {
  const dispatch = useAppDispatch();

  // modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePermission, setActivePermission] = useState<null | TPermission>(
    null
  );
  // pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // filter states
  const [filterPermissionName, setFilterPermissionName] = React.useState("");
  // popover menu states
  const [popoverEle, setPopOverEle] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  // permissions states
  const { permissions, isLoading } = useSelector((state: AppState) => ({
    permissions: state.adminPermissions.data,
    isLoading: state.adminPermissions.isLoading,
  }));

  // handle search by order id
  const handleFilterByPermissionName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPage(0);
    setFilterPermissionName(event.target.value);
  };

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

  // orders state
  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  // popover open/close handler
  const handlePopoverOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    permission: TPermission
  ) => {
    setActivePermission(permission);
    setPopOverEle(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOverEle(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setActivePermission(null);
  };

  // popover menu item click handler
  const handlePermissionEditClick = () => {
    handlePopoverClose();
    setIsModalOpen(true);
  };

  const handlePermissionDeleteClick = async () => {
    if (activePermission)
      await dispatch(deletePermission({ id: activePermission._id }));
    handlePopoverClose();
    setActivePermission(null);
  };

  // filter orders
  const filterPermissions = permissions.filter((u) =>
    u.name
      .toLocaleLowerCase()
      .includes(filterPermissionName.toLocaleLowerCase())
  );

  const isNotFound = !filterPermissions.length && !!filterPermissionName;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h6">Permissions</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsModalOpen(true)}
        >
          New Permission
        </Button>
      </Stack>

      {/* create/edit permission modal */}
      <CustomModal
        modalTitle="Create Permission"
        isOpen={isModalOpen}
        onClose={() => handleModalClose()}
        component={
          <PermissionForm
            permission={activePermission}
            handleClose={() => handleModalClose()}
          />
        }
      />

      <Card>
        <TextField
          size="small"
          sx={{ ml: 1, flex: 1, margin: "1rem" }}
          placeholder="Search by name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleFilterByPermissionName}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterPermissions
                .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                .map((permission) => {
                  return (
                    <PermissionTableBody
                      permission={permission}
                      key={permission._id}
                      handlePopoverOpen={handlePopoverOpen}
                    />
                  );
                })}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Typography variant="h6" paragraph>
                      Not found
                    </Typography>

                    <Typography variant="body2">
                      No results found for &nbsp;
                      <strong>&quot;{filterPermissionName}&quot;</strong>.
                      <br /> Try checking for the permission name.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  count={filterPermissionName.length}
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
        handleEdit={handlePermissionEditClick}
        handleDelete={handlePermissionDeleteClick}
        handleCloseMenu={handlePopoverClose}
      />
    </Container>
  );
}

export default AdminPermissions;
