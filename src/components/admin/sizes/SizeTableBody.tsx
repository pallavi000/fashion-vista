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

import { TSize } from "../../../@types/size";

// component props type
type SizeBodyTableProps = {
  size: TSize;
  handlePopoverOpen: Function;
};

function SizeBodyTable({ size, handlePopoverOpen }: SizeBodyTableProps) {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component={"td"} align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {size.name}
          </Typography>
        </TableCell>

        <TableCell align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {size.createdAt}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton
            size="large"
            color="inherit"
            onClick={(e) => handlePopoverOpen(e, size)}
          >
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

export default SizeBodyTable;
