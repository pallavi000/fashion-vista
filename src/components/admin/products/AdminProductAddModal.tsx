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
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";

// types
import { TCategory } from "../../../@types/category";
import { ProductInputs } from "../../../@types/product";

// icons
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// reducers
import { addNewProduct } from "../../../redux/reducers/admin/adminProductReducer";

// components
import LoadingButton from "../../LoadingButton";
import { TSize } from "../../../@types/size";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  image: yup.string().required("Image is required"),
  stock: yup.number().required("Stock is required"),
  size: yup.string().required("Size is required"),
});

// component props type
type AdminProductAddProps = {
  categories: TCategory[];
  sizes: TSize[];
  isOpen: boolean;
  setIsOpen: Function;
};

export default function AdminProductAddModal({
  categories,
  sizes,
  isOpen,
  setIsOpen,
}: AdminProductAddProps) {
  const dispatch = useAppDispatch();

  const isLoading = useSelector(
    (state: AppState) => state.adminProducts.isLoading
  );

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductInputs>({
    resolver: yupResolver(validationSchema),
  });

  // form submit handler
  const onSubmit = async (data: ProductInputs) => {
    const productData: ProductInputs = {
      ...data,
    };
    await dispatch(addNewProduct(productData));
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
        <DialogTitle>Add New Product</DialogTitle>
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
                  {...field}
                  label="Title"
                  variant="outlined"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  type="number"
                  {...field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  label="Price"
                  variant="outlined"
                  error={Boolean(errors.price)}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  minRows={4}
                  variant="outlined"
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.category)}>
                  <InputLabel id="demo-simple-select-label">
                    Select a category
                  </InputLabel>
                  <Select
                    {...field}
                    label="Select a category"
                    variant="outlined"
                    error={Boolean(errors.category)}
                  >
                    {categories.map((category: TCategory) => {
                      return (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.category?.message ? (
                    <FormHelperText>{errors.category?.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.size)}>
                  <InputLabel id="demo-simple-select-label">
                    Select a Size
                  </InputLabel>
                  <Select
                    {...field}
                    label="Select a size"
                    variant="outlined"
                    error={Boolean(errors.size)}
                  >
                    {sizes.map((size: TSize) => {
                      return (
                        <MenuItem key={size._id} value={size._id}>
                          {size.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.size?.message ? (
                    <FormHelperText>{errors.size?.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image Link"
                  variant="outlined"
                  error={Boolean(errors.image)}
                  helperText={errors.image?.message}
                />
              )}
            />
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stock"
                  variant="outlined"
                  error={Boolean(errors.stock)}
                  helperText={errors.stock?.message}
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
