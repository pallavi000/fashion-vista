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
import Products from "./pages/Products";
import SearchResult from "./pages/SearchResult";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDashboardLayout from "./components/layout/admin/AdminDashboardLayout";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProducts from "./pages/admin/AdminProducts";
import NotFound from "./pages/NotFound";

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
      <AdminDashboardLayout>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminDashboardLayout>
    </Router>
  ) : (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/category/:id/products" element={<CategoryProducts />} />
        {user && user.role === "customer" && (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account/:page?" element={<Account />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
