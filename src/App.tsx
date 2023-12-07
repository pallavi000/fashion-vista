import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "./redux/store";

// Reducer
import { getCurrentUser } from "./redux/reducers/authReducer";
import AppRouter from "./routes/AppRouter";

// components
import ScrollToTop from "./components/ScrollToTop";
import { getCartItems } from "./redux/reducers/cartReducer";

const App = () => {
  // App Dispatch
  const dispatch = useAppDispatch();

  // Auth States
  const { access_token, user, cart } = useSelector((state: AppState) => ({
    access_token: state.auth.access_token,
    user: state.auth.user,
    cart: state.cart.items,
  }));

  // Get current user
  useEffect(() => {
    if (access_token && !user) {
      dispatch(getCurrentUser());
    }
  }, [access_token, user, dispatch]);

  useEffect(() => {
    if (access_token || user) {
      dispatch(getCartItems());
    }
  }, [access_token, user, dispatch]);

  return (
    <Router>
      <GoogleOAuthProvider clientId="636134274529-2qocgmf3ug0qn5pdt3buo4ucd3vlej8v.apps.googleusercontent.com">
        <ScrollToTop />
        <AppRouter />
      </GoogleOAuthProvider>
    </Router>
  );
};

export default App;
