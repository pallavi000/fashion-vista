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
import { updateAdminCategory } from "../../../redux/reducers/admin/adminCategoryReducer";

type AdminCategoryEditModalProps = {
  category: TCategory;
  isOpen: boolean;
  setIsOpen: Function;
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup.string().required("Image Link is required"),
});

export default function AdminCategoryEditModal({
  category,
  isOpen,
  setIsOpen,
}: AdminCategoryEditModalProps) {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CategoryInputs>({
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    setValue("name", category.name);
    setValue("image", category.image);
  }, [category]);

  const onSubmit = async (data: CategoryInputs) => {
    const categoryData: TCategory = { ...data, id: category.id };
    await dispatch(updateAdminCategory(categoryData));
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
        <DialogTitle>Update Category</DialogTitle>
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
                  label="Enter name"
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
                  label="Enter Image Link"
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
