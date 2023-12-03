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
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

// types
import { TSize, SizeInputs } from "../../../@types/size";

// reducers
import { updateAdminSize } from "../../../redux/reducers/admin/adminSizeReducer";

// components
import LoadingButton from "../../LoadingButton";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

// component props type
type AdminSizeEditModalProps = {
  size: TSize;
  isOpen: boolean;
  setIsOpen: Function;
};

export default function AdminSizeEditModal({
  size,
  isOpen,
  setIsOpen,
}: AdminSizeEditModalProps) {
  const dispatch = useAppDispatch();

  // user state
  const isLoading = useSelector(
    (state: AppState) => state.adminCategories.isLoading
  );

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SizeInputs>({
    resolver: yupResolver(validationSchema),
  });

  // set default values
  React.useEffect(() => {
    setValue("name", size.name);
  }, [size]);

  // form submit handler
  const onSubmit = async (data: SizeInputs) => {
    const sizeData: TSize = { ...data, _id: size._id };
    await dispatch(updateAdminSize(sizeData));
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
        <DialogTitle>Update Size</DialogTitle>
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
          <LoadingButton isLoading={isLoading} color="success" title="Update" />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
