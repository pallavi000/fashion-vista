import React from "react";

// MUI
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  Button,
} from "@mui/material";

//icons
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/CheckCircle";

function Address() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Your Addresses
      </Typography>
      <Box
        sx={{
          minWidth: 256,
          marginTop: 2,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={6} minHeight={200}>
            <Box
              onClick={() => alert("implmenet add address popup/modal")}
              sx={{
                border: "2px dotted #ddd",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <AddIcon fontSize={"large"} sx={{ color: "#ddd" }} />
              <Typography variant="h6">Add Address</Typography>
            </Box>
          </Grid>

          {Array.from(Array(3)).map((_, index) => (
            <Grid item xs={2} sm={4} md={6} key={index}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    borderBottom: "1px solid #ddd",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography variant="caption">Default:</Typography>
                  <CheckIcon color="success" />
                </Box>

                <Box sx={{ padding: 1 }}>
                  <Typography variant="body2">City</Typography>
                  <Typography variant="body2">Country</Typography>
                  <Typography variant="body2">ZipCode</Typography>
                  <Typography variant="body2">Street</Typography>
                </Box>

                <Box
                  sx={{
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button variant="text" size="small">
                    Edit
                  </Button>
                  <Box>|</Box>
                  <Button variant="text" size="small">
                    Remove
                  </Button>
                  <Box>|</Box>
                  <Button variant="text" size="small">
                    Set as Default
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Address;
