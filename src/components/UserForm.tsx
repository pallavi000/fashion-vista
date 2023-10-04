import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";

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
import { RegisterInputs } from "../@types/user";

// component props type
type UserFormProps = {
  control: Control<RegisterInputs, any>;
  errors: FieldErrors<RegisterInputs>;
};

function UserForm({ control, errors }: UserFormProps) {
  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Full name"
            variant="outlined"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            type="password"
            {...field}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        )}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <FormControl error={Boolean(errors.role)}>
            <InputLabel id="demo-simple-select-label">Select a role</InputLabel>
            <Select
              {...field}
              label="Select a role"
              variant="outlined"
              error={Boolean(errors.role)}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {errors.role?.message ? (
              <FormHelperText>{errors.role?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
    </>
  );
}

export default UserForm;
