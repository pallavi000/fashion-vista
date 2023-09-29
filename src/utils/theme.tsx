// Import necessary modules
import { createTheme } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1B4B66", // Your primary color
    },
    secondary: {
      main: "#445069", // Your secondary color
    },
    info: {
      main: "#fff",
    },
    background: {
      default: "#fff", // Change this to your desired background color
    },
  },
  typography: {
    fontFamily: "Roboto",

    body1: {
      fontWeight: "500",
      fontSize: "16px",
    },
    body2: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#7E7E7E",
    },
    h4: {
      fontWeight: "700",
    },
    caption: {
      fontSize: "14px",
      fontWeight: "500",
    },
  },
});

export default theme;
