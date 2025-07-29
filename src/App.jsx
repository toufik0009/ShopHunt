import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import { AppProvider } from "./context/AppContext";

// Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ProductList from "./pages/Product";
import CategoryPage from "./pages/Category";

// Auth
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";

// Private route wrapper
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <AppProvider>
        <ScrollToTop />
        {isAuthenticated && <Header />}

        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path="/category"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CategoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/category/:categoryName"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CategoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Cart />
              </PrivateRoute>
            }
          />
        </Routes>

        {isAuthenticated && <Footer />}
      </AppProvider>
    </Router>
  );
};

export default App;
