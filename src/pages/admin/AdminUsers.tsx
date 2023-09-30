import { MoreVert, PersonAdd, Search } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Popover,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { fetchUsers } from "../../redux/reducers/admin/adminUserReducer";

function AdminUsers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);
  const [filterName, setFilterName] = React.useState("");

  const dispatch = useAppDispatch();
  const users = useSelector((state: AppState) => state.adminUsers.data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = users.map((u) => u.id);
      setSelectedUsers(newSelecteds);
      return;
    }
    setSelectedUsers([]);
  };

  const handleSelectClick = (event: any, id: number) => {
    if (selectedUsers.includes(id)) {
      const filterdSelectedUsers = selectedUsers.filter((s) => s !== id);
      setSelectedUsers(filterdSelectedUsers);
    } else {
      setSelectedUsers((prev) => [...prev, id]);
    }
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
  );
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h6">Users</Typography>
          <Button size="small" variant="contained" startIcon={<PersonAdd />}>
            New User
          </Button>
        </Stack>
        <Card>
          <TextField
            size="small"
            sx={{ ml: 1, flex: 1, margin: "1rem" }}
            placeholder="Search Users"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleFilterByName}
          />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      checked={
                        users.length > 0 &&
                        selectedUsers.length === users.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                  .map((user) => {
                    const selectedUser = selectedUsers.indexOf(user.id) !== -1;
                    return (
                      <TableRow
                        hover
                        key={user.id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedUser}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) =>
                              handleSelectClick(event, user.id)
                            }
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt={user.name} src={user.avatar} />
                            <Typography variant="body1" noWrap>
                              {user.name}
                            </Typography>
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
                          <Chip size="small" label={user.creationAt} />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit">
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found for &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 50]}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}

export default AdminUsers;
