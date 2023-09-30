import { Add, MoreVert, Search } from "@mui/icons-material";
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
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { fetchAdminAllProducts } from "../../redux/reducers/admin/adminProductReducer";

function AdminProducts() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedProducts, setSelectedProducts] = React.useState<number[]>([]);
  const [filterName, setFilterName] = React.useState("");

  const dispatch = useAppDispatch();
  const products = useSelector((state: AppState) => state.adminProducts.data);

  useEffect(() => {
    dispatch(fetchAdminAllProducts());
  }, []);

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = products.map((u) => u.id);
      setSelectedProducts(newSelecteds);
      return;
    }
    setSelectedProducts([]);
  };

  const handleSelectClick = (event: any, id: number) => {
    if (selectedProducts.includes(id)) {
      const filterdSelectedUsers = selectedProducts.filter((s) => s !== id);
      setSelectedProducts(filterdSelectedUsers);
    } else {
      setSelectedProducts((prev) => [...prev, id]);
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

  const filterProducts = products.filter((u) =>
    u.title.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
  );
  const isNotFound = !filterProducts.length && !!filterName;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h6">Products</Typography>
        <Button size="small" variant="contained" startIcon={<Add />}>
          New Product
        </Button>
      </Stack>
      <Card>
        <TextField
          size="small"
          sx={{ ml: 1, flex: 1, margin: "1rem" }}
          placeholder="Search Products"
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
                      selectedProducts.length > 0 &&
                      selectedProducts.length < products.length
                    }
                    checked={
                      products.length > 0 &&
                      selectedProducts.length === products.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterProducts
                .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                .map((product) => {
                  const selectedProduct =
                    selectedProducts.indexOf(product.id) !== -1;
                  return (
                    <TableRow
                      hover
                      key={product.id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={selectedProduct}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedProduct}
                          onChange={(event) =>
                            handleSelectClick(event, product.id)
                          }
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={product.title} src={product.images[0]} />
                          <Typography variant="body1" noWrap>
                            {product.title}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell component={"td"} align="left">
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "15rem",
                          }}
                        >
                          <Typography
                            variant="caption"
                            fontWeight={"400"}
                            color={"text.primary"}
                            noWrap
                          >
                            {product.description}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            alt={product.category.name}
                            src={product.category.image}
                            sx={{
                              width: 24,
                              height: 24,
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontWeight={"400"}
                            color={"text.primary"}
                          >
                            {product.category.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Chip
                          color="success"
                          size="small"
                          label={`$${product.price}`}
                        />
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  count={filterProducts.length}
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
  );
}

export default AdminProducts;
