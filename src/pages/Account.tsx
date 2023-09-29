import {
  Avatar,
  Box,
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
import Img from "../images/img1.png";

const items = [1, 2];

function Account() {
  const { page } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state: AppState) => state.auth.user);

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
              <Grid container columns={12} spacing={3}>
                <Grid item xs={12} md={12}>
                  <Grid container columns={12} spacing={3}>
                    <Grid item xs={6}>
                      <Typography variant="body1">Product Name</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body1">Price</Typography>
                        <Typography variant="body1">Qty</Typography>
                        <Typography variant="body1">SubTotal</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ margin: "0.5rem 0rem" }} />
                  {items.map((item, index) => {
                    return (
                      <Grid container columns={12} margin={"0.8rem 0rem"}>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Box sx={{ height: "75px", width: "75px" }}>
                            <img
                              src={Img}
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "0.3rem",
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="body1">
                              Product name
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "gray",
                              }}
                            >
                              Product Category
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "gray",
                              }}
                            >
                              Qty-1
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body1">$54</Typography>
                          <Typography variant="body1">1</Typography>
                          <Typography variant="body1">$54</Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Typography variant="h6">Order Information</Typography>
              <Divider sx={{ margin: "0.5rem 0rem" }} />
              <Grid container columns={12}>
                <Grid item md={4}>
                  <Typography variant="body2">Order Details</Typography>
                  <Box sx={{ display: "flex", gap: "2rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">Sub Total</Typography>
                      <Typography variant="caption">Discount</Typography>
                      <Typography variant="caption">Shipping Fee</Typography>
                      <Typography variant="caption">Grand Total</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">$118</Typography>
                      <Typography variant="caption">$0.00</Typography>
                      <Typography variant="caption">$0.00</Typography>
                      <Typography variant="caption">$118</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="body2">Payment Details</Typography>
                  <Typography sx={{ fontSize: 14, color: "black" }}>
                    Cash on Deliver
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="body2">Address Details</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.083rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "black",
                      }}
                    >
                      Vaaritehtankatu,
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "black",
                      }}
                    >
                      01300,Tikkurila
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "black",
                      }}
                    >
                      Finland
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "black",
                      }}
                    >
                      +358-046239787
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <Card sx={{ borderRadius: 8, minWidth: 256, textAlign: "center" }}>
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
                <span
                  style={{
                    fontSize: 14,
                    color: "gray",
                    marginBottom: "0.875em",
                  }}
                >
                  {user?.email}
                </span>
              </CardContent>
              <Divider light />
              <Box display={"flex"}>
                <Box
                  p={2}
                  flex={"auto"}
                  sx={{
                    borderColor: "rgba(0, 0, 0, 0.08)",
                    height: "50%",
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      color: "gray",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    Role
                  </p>
                  <Typography variant="caption">{user?.role}</Typography>
                </Box>
                <Box
                  p={2}
                  flex={"auto"}
                  sx={{
                    borderColor: "rgba(0, 0, 0, 0.08)",
                    height: "50%",
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      color: "gray",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    Created At
                  </p>
                  <Typography variant="caption">{user?.creationAt}</Typography>
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
