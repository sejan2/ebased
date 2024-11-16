import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";

// Pages and Components
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import ShoppingViewLayout from "./components/shopping-view/layout";
import NotFound from "./components/shopping-view/notfound";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import Footer from "./pages/shopping-view/footer";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Home route - accessible to everyone */}
        <Route path="/" element={<Navigate to="/shop/home" replace />} />
        <Route path="/shop/home" element={<ShoppingHome />} />

        {/* Auth routes - accessible to everyone (login/register) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin routes - protected */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminLayout />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Shopping routes - protected */}
        <Route path="/shop" element={<ShoppingViewLayout />}>
          <Route
            path="listing"
            element={
              isAuthenticated ? (
                <ShoppingListing />
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
          />
          <Route
            path="account"
            element={
              isAuthenticated ? (
                <ShoppingAccount />
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Footer */}
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
