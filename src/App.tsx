import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "./redux/store";

// Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import CategoryProducts from "./pages/CategoryProducts";
import Register from "./pages/Register";
import Products from "./pages/Products";
import SearchResult from "./pages/SearchResult";
import OrderSuccess from "./pages/OrderSuccess";
import Dashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProfile from "./pages/admin/AdminProfile";
import NotFound from "./pages/NotFound";

// Layouts & Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AdminDashboardLayout from "./components/layout/admin/AdminDashboardLayout";

// Reducer
import { getCurrentUser } from "./redux/reducers/authReducer";

const App = () => {
  // App Dispatch
  const dispatch = useAppDispatch();

  // Auth States
  const { access_token, user, isLoading } = useSelector((state: AppState) => ({
    access_token: state.auth.access_token,
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  }));

  // Get current user
  useEffect(() => {
    if (access_token && !user) {
      dispatch(getCurrentUser());
    }
  }, [access_token, user]);

  return isLoading && access_token && !user ? (
    <>Loading</>
  ) : user && user.role === "admin" ? (
    <Router>
      <AdminDashboardLayout>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
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
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
