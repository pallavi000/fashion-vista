import axios, { AxiosError } from "axios";
import { VariantType, enqueueSnackbar } from "notistack";

export const getOrderDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
};

export const getOrderId = () => {
  const min = 100000;
  const max = 999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

export const remToPx = (value: string) => {
  return Math.round(parseFloat(value) * 16);
};

export const pxToRem = (value: number) => {
  return `${value / 16}rem`;
};

export const responsiveFontSizes = ({
  sm,
  md,
  lg,
}: {
  sm: number;
  md: number;
  lg: number;
}) => {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
};

export const valueToText = (value: number) => {
  return `$${value}`;
};

export const showApiErrorToastr = (error: Error | AxiosError) => {
  enqueueSnackbar(
    axios.isAxiosError(error) ? error.response?.data?.message : error.message,
    {
      variant: "error",
    }
  );
};

export const showCustomToastr = (message: string, variant: VariantType) => {
  enqueueSnackbar(message, { variant });
};
