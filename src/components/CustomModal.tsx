import React from "react";

// MUI
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

//icons
import CloseIcon from "@mui/icons-material/Close";

type TCustomModalProps = {
  modalTitle: string;
  isOpen: boolean;
  onClose: Function;
  component: React.ReactElement;
};

function CustomModal({
  modalTitle,
  isOpen,
  onClose,
  component,
}: TCustomModalProps) {
  return (
    <React.Fragment>
      <Dialog fullWidth open={isOpen} onClose={() => onClose()}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme: any) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "2rem 0rem",
            }}
          >
            {component}
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default CustomModal;
