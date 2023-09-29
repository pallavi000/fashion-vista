import { Box, Grid } from "@mui/material";
import React from "react";

function Brand({ brand }: { brand: string }) {
  return (
    <Grid item xs={6} sm={4} md={2}>
      <Box sx={{ cursor: "pointer", height: "168px", width: "168px" }}>
        <img src={brand} height={"100%"} width={"100%"} />
      </Box>
    </Grid>
  );
}

export default Brand;
