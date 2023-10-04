import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

// Material UI
import { ThemeProvider, CssBaseline } from "@mui/material";

// Redux
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

// Theme
import theme from "./utils/theme";

// Snackbar
import styled from "@emotion/styled";
import { MaterialDesignContent, SnackbarProvider } from "notistack";

// Snackbar customization
const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: theme.palette.error.main,
  },
}));

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
