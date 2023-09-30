import { Delete, Edit } from "@mui/icons-material";
import { MenuItem, Popover } from "@mui/material";
import React from "react";

type TableOptionPopoverProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

function TableOptionPopover({ isOpen, setIsOpen }: TableOptionPopoverProps) {
  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <Popover
      open={isOpen}
      onClose={handleCloseMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 140,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem>
        <Edit />
        Edit
      </MenuItem>

      <MenuItem sx={{ color: "error.main" }}>
        <Delete />
        Delete
      </MenuItem>
    </Popover>
  );
}

export default TableOptionPopover;
