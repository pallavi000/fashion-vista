// MUI
import {
  Avatar,
  Checkbox,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

// icons
import { MoreVert } from "@mui/icons-material";

// types

import { TBanner } from "../../../@types/banner";

// component props type
type BannerTableProps = {
  banner: TBanner;
  handlePopoverOpen: Function;
};

function BannerTableBody({ banner, handlePopoverOpen }: BannerTableProps) {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component={"td"} align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {banner.banner}
          </Typography>
        </TableCell>
        <TableCell component={"td"} align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {banner.position}
          </Typography>
        </TableCell>
        <TableCell component={"td"} align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {banner.page}
          </Typography>
        </TableCell>

        <TableCell align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {banner.createdAt}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton
            size="large"
            color="inherit"
            onClick={(e) => handlePopoverOpen(e, banner)}
          >
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

export default BannerTableBody;
