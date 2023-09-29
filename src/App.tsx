import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProductDetail from "./pages/ProductDetail";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "./redux/store";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/reducers/authReducer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import CategoryProducts from "./pages/CategoryProducts";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  const dispatch = useAppDispatch();
  const { access_token, user, isLoading } = useSelector((state: AppState) => ({
    access_token: state.auth.access_token,
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  }));

  useEffect(() => {
    if (access_token && !user) {
      dispatch(getCurrentUser());
    }
  }, [access_token, user]);

  return isLoading ? (
    <>Loading</>
  ) : user && user.role === "admin" ? (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  ) : (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:id/products" element={<CategoryProducts />} />
        {user && user.role === "customer" && (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account/:page?" element={<Account />} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
