import React, { useState } from "react";
// redux
import { useAppDispatch } from "../redux/store";

// MUI
import { Box, Fab, TableCell, TableRow, Typography } from "@mui/material";

//icons
import Close from "@mui/icons-material/Close";

// types
import { TCart } from "../@types/cart";
import { TProduct } from "../@types/product";

// reducers
import { removeFromCart } from "../redux/reducers/cartReducer";

// helpers
import { showCustomToastr } from "../utils/helper";

type CartItemProps = { item: TCart };

function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  // remove item from cart handler
  const handleRemoveCart = async (product: TProduct) => {
    dispatch(removeFromCart(product));
    showCustomToastr("Item removed from the cart.", "success");
  };

  return (
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
  );
}

export default CartItem;
