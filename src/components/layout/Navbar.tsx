import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Badge,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Tooltip,
} from "@mui/material";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FavoriteBorder, ShoppingBagOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import StoreIcon from "@mui/icons-material/Store";

// types
import { TUser } from "../../@types/user";

// reducers
import { logoutUser } from "../../redux/reducers/authReducer";
import { fetchCategories } from "../../redux/reducers/categoriesReducer";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // user profile icon click popover state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // search state
  const [searchQuery, setSearchQuery] = useState("");

  // auth states
  const {
    isAuthenticated,
    user,
  }: { isAuthenticated: boolean; user: TUser | null } = useSelector(
    (state: AppState) => ({
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
    })
  );

  // cart state
  const cartQuantity = useSelector(
    (state: AppState) => state.cart.totalQuantity
  );

  // categories
  const categories = useSelector((state: AppState) => state.categories.data);

  // fetch categories
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // handle user profile/icon click popover
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout handler
  const logout = () => {
    handleClose();
    dispatch(logoutUser());
    navigate("/");
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
            <Link
              to="/"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <StoreIcon fontSize={"large"} color="primary" />
              <Typography variant="h6" color={"primary"}>
                Logo
              </Typography>
            </Link>
            {categories.slice(0, 6).map((category) => {
              return (
                <Link
                  color="text.primary"
                  to={`/category/${category.id}/products`}
                >
                  <Typography variant="body1" fontWeight={"500"}>
                    {category.name}
                  </Typography>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon
                      onClick={() => navigate(`/search/?query=${searchQuery}`)}
                    />
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
