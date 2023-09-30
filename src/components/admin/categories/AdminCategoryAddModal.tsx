import * as React from "react";
import Add from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CategoryInputs, TCategory } from "../../../@types/category";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "../../../redux/store";
import {
  addNewCategory,
  updateAdminCategory,
} from "../../../redux/reducers/admin/adminCategoryReducer";

type AdminCategoryAddProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup.string().required("Image Link is required"),
});

export default function AdminCategoryAddModal({
  isOpen,
  setIsOpen,
}: AdminCategoryAddProps) {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: CategoryInputs) => {
    await dispatch(addNewCategory(data));
    reset();
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        fullWidth
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "2rem 0rem",
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  label="category name"
                  variant="outlined"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  label="category image link"
                  variant="outlined"
                  error={Boolean(errors.image)}
                  helperText={errors.image?.message}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
