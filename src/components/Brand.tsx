// MUI
import { Box, Grid } from "@mui/material";

// component props type
type BrandProps = { brand: string };

function Brand({ brand }: BrandProps) {
  return (
    <Grid item xs={6} sm={4} md={2}>
      <Box sx={{ cursor: "pointer", height: "168px", width: "168px" }}>
        <img src={brand} height={"100%"} width={"100%"} />
      </Box>
    </Grid>
  );
}

export default Brand;
