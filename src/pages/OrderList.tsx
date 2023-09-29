import { Container, Divider, Grid } from "@mui/material";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Img from "../images/img1.png";

const items = [1, 2];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function OrderList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 0rem" }}>
      <Grid container columns={12}>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Item Ordered" {...a11yProps(0)} />
                <Tab label="Invoices" {...a11yProps(1)} />
                <Tab label="Order Shipment" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Grid container columns={12} spacing={3}>
                <Grid item xs={12} md={12}>
                  <Grid container columns={12} spacing={3}>
                    <Grid item xs={6}>
                      <Typography variant="h5">Product Name</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h5">Price</Typography>
                        <Typography variant="h5">Qty</Typography>
                        <Typography variant="h5">SubTotal</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ margin: "1rem 0rem" }} />
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
                              gap: "0.06rem",
                            }}
                          >
                            <Typography variant="body1">
                              Product name
                            </Typography>
                            <Typography variant="body2">
                              Product Category
                            </Typography>
                            <Typography variant="body2">Qty-1</Typography>
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
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Invoices
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Order Shipment
            </CustomTabPanel>
          </Box>
          <Typography variant="h6">Order Information</Typography>
          <Divider sx={{ margin: "0.5rem 0rem" }} />
          <Grid container columns={12}>
            <Grid item md={4}>
              <Typography variant="body2">Order Details</Typography>
              <Box></Box>
            </Grid>
            <Grid item md={4}>
              <Typography variant="body2">Payment Details</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="body2">Address Details</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OrderList;
