import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SideBarItem({ item }: { item: any }) {
  return (
    <ListItemButton
      component={NavLink}
      to={item.path}
      sx={{
        height: 48,
        position: "relative",
        textTransform: "capitalize",
        color: "text.secondary",
        borderRadius: 4,
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "bold",
        },
      }}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText disableTypography primary={item.title} />
    </ListItemButton>
  );
}

export default SideBarItem;
