import React from "react";
// redux
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";

// MUI
import { Avatar, Box, Drawer, Link, List, Typography } from "@mui/material";

// icons
import {
  AccountCircle,
  Category,
  Dashboard,
  Money,
  ShoppingBag,
  Store,
} from "@mui/icons-material";

// components
import SideBarItem from "./SideBarItem";
import { SidebarItem } from "../../../@types/sidebar";

// sidebar menus
const sidebarItems: SidebarItem[] = [
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
  // auth user state
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
          <Box
            sx={{
              px: 2.5,
              py: 3,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Store fontSize={"large"} color="primary" />
            <Typography variant="h6" color={"primary"}>
              Logo
            </Typography>
          </Box>

          <Box sx={{ mb: 3, mx: 2.5 }}>
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
