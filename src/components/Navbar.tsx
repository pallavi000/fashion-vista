import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  InputAdornment,
  InputBase,
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
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

export default function Navbar() {
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    picture: "",
  });

  return (
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
          <Link color="text.primary" to="/">
            HandBag
          </Link>
          <Link color="text.primary" to="/">
            Watches
          </Link>
          <Link to="/" color="text.danger">
            Skincare
          </Link>
          <Link to="/" color="text.danger">
            Jewellery
          </Link>
          <Link to="/" color="text.danger">
            Apparels
          </Link>
        </Box>
        <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
          <FavoriteBorder />
          <PersonOutlineOutlinedIcon />
          <ShoppingBagOutlined />
        </nav>
      </Toolbar>
    </AppBar>
  );
}
