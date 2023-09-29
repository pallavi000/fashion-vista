import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppState, useAppDispatch } from "../redux/store";
import { loginUser, registerUser } from "../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterInputs } from "../@types/user";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  role: yup.string().required("Role is required"),
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useSelector((state: AppState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
  }));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    data.avatar =
      data.role === "admin"
        ? "https://i.imgur.com/gxaUWSF.jpeg"
        : "https://i.imgur.com/fpT4052.jpeg";
    dispatch(registerUser(data));
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <Container maxWidth="sm">
      <Card
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        variant="outlined"
        sx={{ padding: "3rem", textAlign: "center" }}
      >
        <Typography variant="h4" marginBottom={"3rem"}>
          Register
        </Typography>
        {error ? (
          <Alert severity="error" sx={{ marginBottom: "3rem" }}>
            {error}
          </Alert>
        ) : null}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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
                <InputLabel id="demo-simple-select-label">
                  Select a role
                </InputLabel>
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
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default Register;
