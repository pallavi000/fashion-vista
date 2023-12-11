import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "../../LoadingButton";

import { SizeInputs, TSize } from "../../../@types/size";
import {
  addNewSize,
  updateAdminSize,
} from "../../../redux/reducers/admin/adminSizeReducer";

// yup validation shchema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

type SizeFormProps = {
  handleClose: () => void;
  size?: TSize | null;
};
function SizeForm({ handleClose, size = null }: SizeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sizeName, setSizeName] = useState<string>();
  const dispatch = useAppDispatch();

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SizeInputs>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (size) {
      setSizeName(size.name);
      const sizeNameArray = size.name;
      setValue("name", sizeNameArray[0]);
    }
  }, [size]);

  // form submit handler
  const onSubmit = async (data: SizeInputs) => {
    setIsSubmitting(true);
    const formData = {
      name: sizeName || data.name.toUpperCase(),
    };
    // update or create
    if (size) {
      const sizeData: TSize = { ...data, _id: size._id };
      await dispatch(updateAdminSize(sizeData));
    } else {
      await dispatch(addNewSize(formData));
    }
    reset();
    setIsSubmitting(false);
    handleClose();
  };

  const handleSizeChange = () => {
    const sizeName = getValues("name");
    if (sizeName) {
      setValue("name", sizeName.toUpperCase());
    }
    setSizeName(sizeName);
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                onBlur={handleSizeChange}
                label="Size Name"
                variant="outlined"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4, marginBottom: 0, float: "right" }}>
        <LoadingButton
          isLoading={isSubmitting}
          color="success"
          title={"Submit"}
        />
      </Box>
    </Box>
  );
}

export default SizeForm;
