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
import { TUser } from "../../../@types/user";

// component props type
type UserTableBodyProps = {
  user: TUser;
  selectedUsers: string[];
  handleSelectClick: Function;
  handlePopoverOpen: Function;
};

function UserTableBody({
  user,
  selectedUsers,
  handleSelectClick,
  handlePopoverOpen,
}: UserTableBodyProps) {
  // is this row selected?
  const selectedUser = selectedUsers.indexOf(user._id) !== -1;
  return (
    <>
      <TableRow
        hover
        key={user._id}
        tabIndex={-1}
        role="checkbox"
        selected={selectedUser}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={selectedUser}
            onChange={(event) => handleSelectClick(event, user._id)}
          />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Chip
            avatar={<Avatar alt={user.firstName} src={user.avatar} />}
            label={`${user.firstName} ${user.lastName}`}
            variant="outlined"
          />
        </TableCell>
        <TableCell>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={1}
            flexWrap={"wrap"}
          >
            {user.permission?.map((permission) => {
              return (
                <Chip
                  key={permission._id}
                  label={permission.name}
                  color="success"
                  size="small"
                />
              );
            })}
          </Stack>
        </TableCell>
        <TableCell component={"td"} align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {user.email}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {user.role}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Chip
            size="small"
            label={new Date(user.createdAt ?? "").toLocaleString()}
          />
        </TableCell>
        <TableCell align="right">
          <IconButton
            size="large"
            color="inherit"
            onClick={(e) => handlePopoverOpen(e, user)}
          >
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

export default UserTableBody;
