import React, { useState } from "react";
import { TCategory } from "../../../@types/category";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  IconButton,
  Link,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AdminCategoryEditModal from "./AdminCategoryEditModal";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch } from "../../../redux/store";
import { deleteAdminCategory } from "../../../redux/reducers/admin/adminCategoryReducer";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminCategoryCard({ category }: { category: TCategory }) {
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCategoryDelete = async () => {
    await dispatch(deleteAdminCategory({ id: category.id }));
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <AdminCategoryEditModal
        category={category}
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
        <DialogTitle>{"Confirm Category Deletion?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this category? This action cannot be
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
            onClick={() => handleCategoryDelete()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <Box sx={{ pt: "100%", position: "relative" }}>
          <img
            style={{
              top: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
            }}
            alt={category.name}
            src={category.image}
          />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="button" noWrap>
            {category.name}
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
              aria-label="delete"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Delete fontSize={"small"} />
            </Fab>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}

export default AdminCategoryCard;
