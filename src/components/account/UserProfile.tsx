import React, { useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

// MUI
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Remove } from "@mui/icons-material";
import CustomModal from "../CustomModal";
import { TUser } from "../../@types/user";
import UserForm from "../UserForm";
import AdminUserForm from "../admin/users/AdminUserForm";
import UpdateProfileForm from "../UpdateProfileForm";
import ProfileUpdate from "../ProfileUpdate";

function UserProfile() {
  // auth state
  const user = useSelector((state: AppState) => state.auth.user);

  // modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  // popover menu states
  const [popoverEle, setPopOverEle] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const [activeUser, setActiveUser] = useState<null | TUser>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setActiveUser(null);
  };

  // popover open/close handler
  const handlePopoverOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: TUser
  ) => {
    setActiveUser(user);
    setPopOverEle(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOverEle(null);
    //setActiveUser(null);
  };

  return (
    <Card
      sx={{
        minWidth: 256,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Avatar
          sx={{ width: 60, height: 60, margin: "auto" }}
          src={user?.avatar}
        />
        <h3
          style={{
            fontSize: 18,
            fontWeight: "bold",
            letterSpacing: "0.5px",
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {user?.firstName} {user?.lastName}
        </h3>
      </CardContent>
      <Typography variant="h6" sx={{ textAlign: "left", padding: "0rem 3rem" }}>
        Personal Details
      </Typography>
      <Divider light sx={{ margin: "0.5rem 0rem" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "0.3rem",
          margin: "2rem",
          marginTop: "0.5rem",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          textAlign: "left",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "text.primary", fontWeight: "500" }}
          >
            Full Name
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "text.primary", fontWeight: "500" }}
          >
            Email
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            {user?.email}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "text.primary", fontWeight: "500" }}
          >
            Role
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            {user?.role}
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Update Profile
        </Button>

        <CustomModal
          isOpen={isModalOpen}
          modalTitle="Update Profile"
          onClose={() => handleModalClose()}
          component={
            <ProfileUpdate
              user={activeUser}
              handleClose={() => setIsModalOpen(false)}
            />
          }
        />
      </Box>
    </Card>
  );
}

export default UserProfile;
