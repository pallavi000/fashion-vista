import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import { TProduct } from "../@types/product";

function BreadCrumb({ label }: { label: string }) {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      {label}
    </Typography>,
  ];
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
}

export default BreadCrumb;
