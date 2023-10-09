// MUI
import { Box } from "@mui/material";

// components
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function AdminDashboardLayout() {
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
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminDashboardLayout;
