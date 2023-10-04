import React from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../redux/store";

// MUI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Notifications, Search } from "@mui/icons-material";

// reducers
import { logoutUser } from "../../../redux/reducers/authReducer";

function TopBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // user profie/icon click popover handler state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // auth user state
  const user = useSelector((state: AppState) => state.auth.user);

  // popover click handler
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout handler
  const logout = () => {
    handleClose();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        backgroundColor: "background.default",
        width: `calc(100% - ${280 + 1}px)`,
        color: "text.primary",
      }}
    >
      <Toolbar>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <IconButton
            sx={{
              padding: 0,
              width: 44,
              height: 44,
            }}
          >
            <img
              width={24}
              src={"https://tailwindui.com/img/flags/flag-united-states.svg"}
              alt={"flag"}
            />
          </IconButton>

          <IconButton sx={{ width: 48, height: 48 }}>
            <Badge badgeContent={1} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMenu}>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={user?.avatar}
              alt="photoURL"
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                navigate("/admin/profile");
                handleClose();
              }}
              sx={{ minWidth: 180 }}
            >
              <AccountCircleIcon sx={{ marginRight: "0.5rem" }} /> Profile
            </MenuItem>
            <MenuItem onClick={logout}>
              <LogoutIcon sx={{ marginRight: "0.5rem" }} /> Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
      <Divider light />
    </AppBar>
  );
}

export default TopBar;
