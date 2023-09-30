import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import UserIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import { TOrder } from "../@types/order";

const orderLists = [1, 2];

function Account() {
  const { page } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state: AppState) => state.auth.user);
  const orders = useSelector((state: AppState) => state.orders.data);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4}>
          <Card>
            <List component="nav">
              <ListItemButton onClick={() => navigate("/account")}>
                <ListItemIcon>
                  <UserIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/account/orders")}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </List>
          </Card>
        </Grid>
        <Grid item xs={8}>
          {page && page === "orders" ? (
            <>
              {orders.map((order: TOrder) => {
                return <OrderItem key={order.orderId} order={order} />;
              })}
            </>
          ) : (
            <Card
              sx={{
                minWidth: 256,
                textAlign: "center",
              }}
            >
              <CardContent>
                <Avatar
                  sx={{ width: 60, height: 60, margin: "auto" }}
                  src={user?.avatar}
                />
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  {user?.name}
                </h3>
              </CardContent>
              <Typography
                variant="h6"
                sx={{ textAlign: "left", padding: "0rem 3rem" }}
              >
                Personal Details
              </Typography>
              <Divider light sx={{ margin: "0.5rem 0rem" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  borderRadius: "0.3rem",
                  margin: "2rem",
                  marginTop: "0.5rem",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  textAlign: "left",
                  padding: "1rem",
                  gap: "1rem",
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: "14px", color: "grey", fontWeight: "500" }}
                  >
                    Full Name
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", color: "black", fontWeight: "500" }}
                  >
                    {user?.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: "14px", color: "grey", fontWeight: "500" }}
                  >
                    Email
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", color: "black", fontWeight: "500" }}
                  >
                    {user?.email}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{ fontSize: "14px", color: "grey", fontWeight: "500" }}
                  >
                    Role
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", color: "black", fontWeight: "500" }}
                  >
                    {user?.role}
                  </Typography>
                </Box>
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
