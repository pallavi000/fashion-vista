import React, { useState } from "react";
import {
  Button,
  Card,
  TextField,
  Container,
  styled,
  Box,
  Typography,
} from "@mui/material";
import LogoImg from "../../images/logo.svg";

import LinearProgress from "@mui/material/LinearProgress";

function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Container maxWidth="sm" sx={{ padding: "8rem" }}>
      <Card variant="outlined" sx={{ padding: "3rem", textAlign: "center" }}>
        <Typography variant="h4" marginBottom={"3rem"}>
          Sign In
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <TextField
            id="outlined-basic"
            label="Enter Email"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <Button variant="contained">Sign In</Button>
        </Box>
      </Card>
    </Container>
  );
}

export default SignInForm;
