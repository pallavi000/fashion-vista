import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import { Box, Card, Container, Typography } from "@mui/material";

// components
import UserForm from "../components/UserForm";
import LoadingButton from "../components/LoadingButton";

// reducers
import { loginUser, registerUser } from "../redux/reducers/authReducer";

// types
import { RegisterInputs } from "../@types/user";

// routes
import { ROUTES } from "../routes/routers";

// yup form validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  role: yup.string().oneOf(["USER", "ADMIN"]).required("Role is required"),
  avatar: yup.string().optional(),
});

function Register() {
  const navigate = useNavigate();

  // app dispatch
  const dispatch = useAppDispatch();

  const [isEmailAvailable, setIsEmailAvailable] = useState(false);

  // auth states
  const { user, isLoading } = useSelector((state: AppState) => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  }));

  // redirect user after successful registraion/login
  React.useEffect(() => {
    if (user) {
      navigate(ROUTES.HOME);
    }
  }, [user]);

  const methods = useForm<RegisterInputs>({
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  useEffect(() => {
    // demo avatar link set
    setValue("avatar", "https://i.imgur.com/fpT4052.jpeg");
  }, []);

  useEffect(() => {
    if (getValues("email") && !errors.email) {
      console.log("ooooo");
      setIsEmailAvailable(true);
    }
  }, [errors, getValues]);

  // form submit handler
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    await dispatch(registerUser(data));
    // login user
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <Card
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          variant="outlined"
          sx={{ padding: "3rem", textAlign: "center" }}
        >
          <Typography variant="h4" marginBottom={"3rem"}>
            Register
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <UserForm />
            <LoadingButton
              isLoading={isLoading}
              isDisabled={!isEmailAvailable}
              color="success"
              title="Register"
            />
          </Box>
        </Card>
      </FormProvider>
    </Container>
  );
}

export default Register;
