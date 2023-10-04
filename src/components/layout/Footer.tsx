import React from "react";

// MUI
import { Box, Grid, IconButton, Typography } from "@mui/material";

// icons
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <>
      <Grid
        container
        spacing={3}
        columns={12}
        bgcolor={"primary.main"}
        justifyContent="space-between"
        color="primary.contrastText"
        padding={"2rem 2rem"}
        marginTop={"8rem"}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Grid
            container
            spacing={3}
            columns={12}
            bgcolor={"primary.main"}
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <Typography variant="body1">About Us</Typography>
              <Typography variant="body1">Blog</Typography>
              <Typography variant="body1">Career</Typography>
              <Typography variant="body1">Press</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Help & Support
              </Typography>
              <Typography variant="body1">Contact Us</Typography>
              <Typography variant="body1">Knowledge Center</Typography>
              <Typography variant="body1">FAQ</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Legal
              </Typography>
              <Typography variant="body1">Terms & Conditions</Typography>
              <Typography variant="body1">Privacy Policy</Typography>
              <Typography variant="body1">Return Policy</Typography>
              <Typography variant="body1">Security</Typography>
              <Typography variant="body1">Licences</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",

              alignItems: "flex-end",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <IconButton sx={{ color: "primary.contrastText" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "primary.contrastText" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "primary.contrastText" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: "primary.contrastText" }}>
                <YouTubeIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <LocationOnOutlinedIcon />{" "}
              <Typography variant="h6">Helsinki, Finland</Typography>
            </Box>
            <Box>
              <Typography>
                © {new Date().getFullYear()} | Integrify OY All Rights Reserved
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;
