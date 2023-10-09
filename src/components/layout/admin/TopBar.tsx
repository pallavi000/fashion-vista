import React from "react";

// MUI
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
} from "@mui/material";

// icons
import { Search } from "@mui/icons-material";

// components
import ThemeModeSwitch from "../../ThemeModeSwitch";
import NotificationsPopover from "./NotificationPopover";
import AccountPopover from "./AccountPopover";

function TopBar() {
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
          <ThemeModeSwitch />

          <IconButton
            disabled
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

          <NotificationsPopover />

          <AccountPopover />
        </Stack>
      </Toolbar>
      <Divider light />
    </AppBar>
  );
}

export default TopBar;
