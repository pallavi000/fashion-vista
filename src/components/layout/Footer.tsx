import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import fbIcon from "../../images/fb logo.png";
import instaIcon from "../../images/insta logo.png";
import twitterIcon from "../../images/twitter.png";
import youtubeIcon from "../../images/youtube.png";

function Footer() {
  const icons = [fbIcon, instaIcon, twitterIcon, youtubeIcon];
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
            <Grid item xs={12} sm={6} md={4} spacing={3}>
              <Typography variant="h6">Shop by Category</Typography>
              <Typography variant="body1">skincare</Typography>
              <Typography variant="body1">skincare</Typography>
              <Typography variant="body1">skincare</Typography>
              <Typography variant="body1">skincare</Typography>
              <Typography variant="body1">skincare</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">About</Typography>
              <Typography variant="body1">Contact Us</Typography>
              <Typography variant="body1">about Us</Typography>
              <Typography variant="body1">Career</Typography>
              <Typography variant="body1">Press</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">Policy</Typography>
              <Typography variant="body1">Return Policy</Typography>
              <Typography variant="body1">Terms of Use</Typography>
              <Typography variant="body1">Sitemap</Typography>
              <Typography variant="body1">Security</Typography>
              <Typography variant="body1">Privacy</Typography>
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
              {icons.map((icon) => {
                return <img src={icon} />;
              })}
            </Box>
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <LocationOnOutlinedIcon />{" "}
              <Typography variant="h6">Helsinki, Finland</Typography>
            </Box>
            <Box>
              <Typography>© 2021 | Integrify OY All Rights Reserved</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;
