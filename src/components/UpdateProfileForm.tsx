import React from "react";
import { Controller, useFormContext } from "react-hook-form";

// MUI
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// types
import { UpdateProfileInputs } from "../@types/user";

function UpdateProfileForm() {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<UpdateProfileInputs>();

  // is email available?
  const handleEmailValidation = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (!e.target.value) return;
    try {
      const data = { email: e.target.value };
      clearErrors("email");
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Email is already taken.",
      });
    }
  };

  return (
    <>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="First name"
            variant="outlined"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last name"
            variant="outlined"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onBlur={handleEmailValidation}
            label="Email"
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="avatar"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onBlur={handleEmailValidation}
            label="avatar"
            variant="outlined"
            error={Boolean(errors.avatar)}
            helperText={errors.avatar?.message}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onBlur={handleEmailValidation}
            label="phoneNumber"
            variant="outlined"
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
          />
        )}
      />
    </>
  );
}

export default UpdateProfileForm;
