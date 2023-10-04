import React from "react";
// MUI
import { Button, CircularProgress } from "@mui/material";
import { ColorVariant } from "../@types/theme";

type LoadingButtonProps = {
  isLoading: boolean;
  color: ColorVariant;
  title: string;
};

function LoadingButton({ isLoading, color, title }: LoadingButtonProps) {
  return (
    <Button
      disabled={isLoading}
      variant="contained"
      color={color}
      type="submit"
    >
      {isLoading ? <CircularProgress size={24} /> : <>{title}</>}
    </Button>
  );
}

export default LoadingButton;
