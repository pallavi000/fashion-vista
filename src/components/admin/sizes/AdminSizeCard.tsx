import React, { useState } from "react";
// redux
import { useAppDispatch } from "../../../redux/store";

// MUI
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

// icons
import { Delete, Edit } from "@mui/icons-material";

// components
import AdminSizeEditModal from "./AdminSizeEditModal";

// types
import { TSize } from "../../../@types/size";

// reducers
import { deleteAdminSize } from "../../../redux/reducers/admin/adminSizeReducer";

// popover transition from down to up
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// component props type
type AdminSizeCardProps = { size: TSize };

function AdminSizeCard({ size }: AdminSizeCardProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsloading] = useState(false);

  // modal open/close states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // handle category delete submit
  const handleSizeDelete = async () => {
    setIsloading(true);
    await dispatch(deleteAdminSize({ id: size._id }));
    setIsDeleteModalOpen(false);
    setIsloading(false);
  };

  return (
    <>
      <AdminSizeEditModal
        size={size}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />

      <Dialog
        open={isDeleteModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setIsDeleteModalOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Size Deletion?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this size? This action cannot be
            undone and will remove all associated items and data. Please confirm
            your choice to proceed with the deletion.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            onClick={() => handleSizeDelete()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="button" noWrap>
            {size.name}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Fab
              size="small"
              color="warning"
              aria-label="edit"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit fontSize={"small"} />
            </Fab>
            <Fab
              size="small"
              color="error"
              disabled={isLoading}
              aria-label="delete"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              {isLoading ? <CircularProgress /> : <Delete fontSize={"small"} />}
            </Fab>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}

export default AdminSizeCard;
