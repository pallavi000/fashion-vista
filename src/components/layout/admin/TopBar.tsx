import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";
import { Notifications, Search } from "@mui/icons-material";

function TopBar() {
  const user = useSelector((state: AppState) => state.auth.user);

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

          <IconButton>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={user?.avatar}
              alt="photoURL"
            />
          </IconButton>
        </Stack>
      </Toolbar>
      <Divider light />
    </AppBar>
  );
}

export default TopBar;
