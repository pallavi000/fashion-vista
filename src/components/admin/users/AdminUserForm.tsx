import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../redux/store";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Stack,
} from "@mui/material";

// components
import UserForm from "../../UserForm";

// reucers
import {
  addNewUser,
  updateUser,
} from "../../../redux/reducers/admin/adminUserReducer";

// types
import { RegisterInputs, TUser, UpdateUserInputs } from "../../../@types/user";
import LoadingButton from "../../LoadingButton";
import CustomModal from "../../CustomModal";
import PermissionsPickerModal from "../../PermissionsPickerModal";

// yup validation shchema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  role: yup.string().oneOf(["ADMIN", "USER"]).required("Role is required"),
});

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// component props type
type AdminUserFormProps = {
  user?: TUser | null;
  onClose: () => void;
};

export default function AdminUserForm({
  user = null,
  onClose,
}: AdminUserFormProps) {
  const dispatch = useAppDispatch();
  const [isPermissionModalOpen, setIsPermissionModalOpen] =
    React.useState(false);

  const permissions = useSelector(
    (state: AppState) => state.adminPermissions.data
  );

  // user state
  const isLoading = useSelector(
    (state: AppState) => state.adminUsers.isLoading
  );

  // react hook form with yup validation
  const methods = useForm<RegisterInputs | UpdateUserInputs>({
    resolver: yupResolver(
      user ? validationSchema : validationSchema.concat(passwordSchema)
    ),
  });
  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,

    formState: { errors },
  } = methods;

  // set default value for avatar
  React.useEffect(() => {
    setValue("avatar", "https://i.imgur.com/fpT4052.jpeg");
    if (user) {
      setValue("email", user.email);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("avatar", user.avatar ?? "");
      const permissionIds = user.permission?.map((p) => p._id);
      setValue("permission", permissionIds);
      setValue("role", user.role || "USER");
    }
  }, [user]);

  // form submit handler
  const onSubmit = async (data: RegisterInputs | UpdateUserInputs) => {
    if (user) {
      await dispatch(updateUser({ id: user._id, data }));
    } else if ("password" in data) {
      await dispatch(addNewUser(data));
    }
    reset();
    onClose();
  };

  const handlePermissionsSelect = (selectedPermissions: string[]) => {
    setValue("permission", selectedPermissions);
    setIsPermissionModalOpen(false);
  };

  const getPermissionNameFromId = (id: string) => {
    const permission = permissions.find((p) => p._id === id);
    return permission ? permission.name : "UNKNOWN";
  };

  return (
    <FormProvider {...methods}>
      <CustomModal
        modalTitle="Select Permissions"
        component={
          <PermissionsPickerModal
            permissions={permissions}
            selectedPermissions={getValues("permission") ?? []}
            handleSubmit={handlePermissionsSelect}
          />
        }
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        maxWidth="md"
      />
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem 0rem",
          }}
        >
          <UserForm />
        </Box>
        <FormControl>
          <FormLabel>Permissions:</FormLabel>
          {watch("permission")?.length ? (
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              flexWrap={"wrap"}
              marginBottom={1}
              marginTop={1}
            >
              {watch("permission")?.map((permissionId) => {
                if (!permissionId) return;
                return (
                  <Chip
                    key={permissionId}
                    label={getPermissionNameFromId(permissionId)}
                    size="small"
                    color="success"
                  />
                );
              })}
            </Stack>
          ) : (
            <Alert severity="error" sx={{ marginTop: 2, marginBottom: 2 }}>
              No Permissions Selected.
            </Alert>
          )}
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            color="info"
            onClick={() => setIsPermissionModalOpen(true)}
          >
            Select Permissions
          </Button>
        </FormControl>
        <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
        <LoadingButton
          isLoading={isLoading}
          color="success"
          title={user ? "Update" : "Create"}
        />
      </Box>
    </FormProvider>
  );
}
