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

import { BannerInputs, TBanner } from "../../../@types/banner";
import {
  addNewSize,
  updateAdminSize,
} from "../../../redux/reducers/admin/adminSizeReducer";
import {
  addNewBanner,
  updateAdminBanner,
} from "../../../redux/reducers/admin/adminBannerReducer";

// yup validation shchema
const validationSchema = yup.object().shape({
  banner: yup.string().required("Banner is required"),
  position: yup.string().required("position is required"),
  page: yup.string().required("page is required"),
});

type BannerFormProps = {
  handleClose: () => void;
  banner?: TBanner | null;
};
function BannerForm({ handleClose, banner = null }: BannerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  } = useForm<BannerInputs>({
    resolver: yupResolver(validationSchema),
  });

  // form submit handler
  const onSubmit = async (data: BannerInputs) => {
    setIsSubmitting(true);
    const formData = {
      banner: data.banner,
      position: data.position,
      page: data.page,
    };
    // update or create
    if (banner) {
      const bannerData: TBanner = { ...data, _id: banner._id };
      await dispatch(updateAdminBanner(bannerData));
    } else {
      await dispatch(addNewBanner(formData));
    }
    reset();
    setIsSubmitting(false);
    handleClose();
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
            name="banner"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Banner"
                variant="outlined"
                error={Boolean(errors.banner)}
                helperText={errors.banner?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Banner Position"
                variant="outlined"
                error={Boolean(errors.position)}
                helperText={errors.position?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="page"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Banner related Page"
                variant="outlined"
                error={Boolean(errors.page)}
                helperText={errors.page?.message}
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

export default BannerForm;
