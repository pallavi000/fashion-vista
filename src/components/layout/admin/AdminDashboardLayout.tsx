import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function AdminDashboardLayout({ children }: { children: any }) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100%",
        overflow: "hidden",
      }}
    >
      <TopBar />
      <SideBar />
      <Box
        sx={{
          paddingTop: "100px",
          width: "100%",
          paddingBottom: "4rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AdminDashboardLayout;
