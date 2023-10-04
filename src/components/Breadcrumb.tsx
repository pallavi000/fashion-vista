// MUI
import { Breadcrumbs, Link, Typography } from "@mui/material";

// component props type
type BreadCrumbProps = { label: string };

function BreadCrumb({ label }: BreadCrumbProps) {
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
