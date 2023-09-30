import { Avatar, Box, Drawer, Link, List, Typography } from "@mui/material";
import {
  AccountBalance,
  AccountCircle,
  Category,
  Dashboard,
  Money,
  ShoppingBag,
} from "@mui/icons-material";
import React from "react";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";

const sidebarItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <AccountCircle />,
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: <Category />,
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: <ShoppingBag />,
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: <Money />,
  },
];

function SideBar() {
  const user = useSelector((state: AppState) => state.auth.user);
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: 0,
        width: 280,
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "background.default",
            borderRightStyle: "dashed",
          },
        }}
      >
        <Box
          sx={{
            height: 1,
            "& .simplebar-content": {
              height: 1,
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>Logo Here</Box>

          <Box sx={{ mb: 5, mx: 2.5 }}>
            <Link underline="none">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.8rem 2rem",
                  borderRadius: 1.5,
                  backgroundColor: "action.selected",
                }}
              >
                <Avatar src={user?.avatar} alt="photoURL" />

                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.primary" }}
                  >
                    {user?.name}
                  </Typography>

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {user?.role}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Box>

          <Box>
            <List disablePadding sx={{ p: 1 }}>
              {sidebarItems.map((item) => (
                <SideBarItem key={item.path} item={item} />
              ))}
            </List>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Drawer>
    </Box>
  );
}

export default SideBar;
