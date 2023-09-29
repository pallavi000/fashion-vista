import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import Close from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";
import { TCart } from "../@types/cart";
import { removeFromCart } from "../redux/reducers/cartReducer";
import { TProduct } from "../@types/product";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: AppState) => state.cart);
  const { items } = cart;

  const handleRemoveCart = (product: TProduct) => {
    dispatch(removeFromCart(product));
  };

  return (
    <Container>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={"h4"} gutterBottom>
            Shopping Cart
          </Typography>
          <Link to="/checkout">
            <Button variant="contained" endIcon={<KeyboardArrowRight />}>
              Checkout
            </Button>
          </Link>
        </Box>
        {items.length ? (
          <>
            <TableContainer>
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item: TCart) => (
                    <TableRow key={item.product.id}>
                      <TableCell component="th" scope="row">
                        <Box display={"flex"} alignItems={"center"}>
                          <Box width={80} height={80}>
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                              alt={item.product.title}
                              src={item.product.images[0]}
                            />
                          </Box>
                          <Box ml={2}>
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                margin: "0 0 8px 0",
                              }}
                            >
                              {item.product.title}
                            </p>
                            <div
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "20rem",
                              }}
                            >
                              <Typography variant="caption" noWrap>
                                {item.product.description}
                              </Typography>
                            </div>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{item.product.category.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.product.price}</TableCell>
                      <TableCell>
                        <Fab
                          onClick={() => handleRemoveCart(item.product)}
                          size="small"
                          color="error"
                          disableRipple
                        >
                          <Close />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{cart.totalQuantity}</TableCell>
                  <TableCell>${cart.totalPrice}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter> */}
              </Table>
            </TableContainer>
            <Grid
              container
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              marginTop={"1rem"}
            >
              <Grid
                item
                xs={12}
                sm={5}
                md={4}
                container
                alignItems={"flex-end"}
              >
                <Link to="/">
                  <Button variant="outlined" startIcon={<KeyboardArrowLeft />}>
                    Continue Shopping
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={5} md={4}>
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Typography variant="h6">Subtotal:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography align="right" variant="body1">
                      ${cart.totalPrice}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">Shipping:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography align="right" variant="body1">
                      $0
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Divider />
                <br />
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Typography variant="h6">Total:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography align="right" variant="body1">
                      ${cart.totalPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Alert severity="error" sx={{ marginTop: "2rem" }}>
            No item added in your shopping cart!
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default Cart;
