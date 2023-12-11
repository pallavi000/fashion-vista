import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// redux

import { AppState, useAppDispatch } from "../redux/store";
import { Box, Button } from "@mui/material";

// types
import { TUser, UpdateProfileInputs } from "../@types/user";
import UpdateProfileForm from "./UpdateProfileForm";
import { updateProfile } from "../redux/reducers/authReducer";
import LoadingButton from "./LoadingButton";
import { useSelector } from "react-redux";

// yup validation shchema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

// component props type
type ProfileUpdateProps = {
  user?: TUser | null;
  onClose: () => void;
};

export default function ProfileUpdate({ user, onClose }: ProfileUpdateProps) {
  const dispatch = useAppDispatch();

  // user state
  const isLoading = useSelector((state: AppState) => state.auth.isLoading);

  // react hook form with yup validation
  const methods = useForm<UpdateProfileInputs>({
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;
  // auth user state
  const currentUser = useSelector((state: AppState) => state.auth.user);

  // set default value for avatar
  React.useEffect(() => {
    setValue("avatar", "https://i.imgur.com/fpT4052.jpeg");
    if (currentUser) {
      setValue("email", currentUser.email);
      setValue("firstName", currentUser.firstName);
      setValue("lastName", currentUser.lastName);
      setValue("avatar", currentUser.avatar ?? "");
      setValue("phoneNumber", currentUser.phoneNumber ?? "");
    }
  }, [currentUser]);

  // form submit handler
  const onSubmit = async (data: UpdateProfileInputs) => {
    console.log(currentUser);
    if (!currentUser) return;
    await dispatch(updateProfile(data));

    reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem 0rem",
          }}
        >
          <UpdateProfileForm />
        </Box>

        <LoadingButton isLoading={isLoading} color="success" title="Update" />
      </Box>
    </FormProvider>
  );
}
