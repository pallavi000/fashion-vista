import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Avatar,
  Badge,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
  Tooltip,
  alpha,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  FavoriteBorder,
  ShoppingBagOutlined,
  Visibility,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { TUser } from "../../@types/user";
import { logoutUser } from "../../redux/reducers/authReducer";
import { fetchCategories } from "../../redux/reducers/categoriesReducer";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    isAuthenticated,
    user,
  }: { isAuthenticated: boolean; user: TUser | null } = useSelector(
    (state: AppState) => ({
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
    })
  );
  const cartQuantity = useSelector(
    (state: AppState) => state.cart.totalQuantity
  );
  const categories = useSelector((state: AppState) => state.categories.data);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();
    dispatch(logoutUser());
  };

  return (
    <>
      <AppBar
        position="static"
        color={"primary"}
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          padding: "0.5rem 0rem",
          backgroundColor: "white",
          color: "#2a2a2a",
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap", gap: "2rem", fontSize: "18px" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="inherit">
              <Link to="/">Logo</Link>
            </Typography>
            {categories.map((category) => {
              return (
                <Link
                  color="text.primary"
                  to={`/category/${category.id}/products`}
                >
                  {category.name}
                </Link>
              );
            })}
          </Box>
          <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <OutlinedInput
              required
              id="outlined-required"
              size="small"
              sx={{ background: "default" }}
              placeholder="Search for products..."
              onChange={(e) => setInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            {isAuthenticated && user ? (
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <IconButton>
                  <FavoriteBorder />
                </IconButton>
                <IconButton onClick={() => navigate("/cart")}>
                  <Badge badgeContent={cartQuantity} color="success">
                    <ShoppingBagOutlined />
                  </Badge>
                </IconButton>
                <Tooltip title={user.name}>
                  <IconButton onClick={handleMenu}>
                    <Avatar
                      alt={user.name}
                      src={user.avatar}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/account");
                    }}
                    sx={{ minWidth: 180 }}
                  >
                    <AccountCircleIcon sx={{ marginRight: "0.5rem" }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <LogoutIcon sx={{ marginRight: "0.5rem" }} /> Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Link to={"/sign-in"}>
                  <Button variant="contained">Login</Button>
                </Link>
                <Link to={"/register"}>
                  <Button variant="outlined">Register</Button>
                </Link>
              </>
            )}
          </nav>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
