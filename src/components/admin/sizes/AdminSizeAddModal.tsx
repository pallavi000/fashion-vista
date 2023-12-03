import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../redux/store";

// MUI
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

// reducers
import { addNewCategory } from "../../../redux/reducers/admin/adminCategoryReducer";

// types
import { SizeInputs } from "../../../@types/size";

// components
import LoadingButton from "../../LoadingButton";
import { addNewSize } from "../../../redux/reducers/admin/adminSizeReducer";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

// component props type
type AdminCategoryAddProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

export default function AdminSizeAddModal({
  isOpen,
  setIsOpen,
}: AdminCategoryAddProps) {
  const dispatch = useAppDispatch();

  // user state
  const isLoading = useSelector(
    (state: AppState) => state.adminCategories.isLoading
  );

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SizeInputs>({
    resolver: yupResolver(validationSchema),
  });

  // form submit handler
  const onSubmit = async (data: SizeInputs) => {
    await dispatch(addNewSize(data));
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
        <DialogTitle>Add New Size</DialogTitle>
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
                  label="Size name"
                  variant="outlined"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
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
          <LoadingButton isLoading={isLoading} color="success" title="Create" />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
