import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";

// React lazy import for components
import React, { Suspense } from "react";

const AuthLogin = React.lazy(() => import("./pages/auth/login"));
const AuthRegister = React.lazy(() => import("./pages/auth/register"));
const AuthLayout = React.lazy(() => import("./components/auth/layout"));
const AdminLayout = React.lazy(() => import("./components/admin-view/layout"));
const AdminDashboard = React.lazy(() =>
  import("./pages/admin-view/dashboard")
);
const AdminProducts = React.lazy(() => import("./pages/admin-view/products"));
const AdminOrders = React.lazy(() => import("./pages/admin-view/orders"));
const ShoppingViewLayout = React.lazy(() =>
  import("./components/shopping-view/layout")
);
const NotFound = React.lazy(() => import("./components/shopping-view/notfound"));
const ShoppingHome = React.lazy(() => import("./pages/shopping-view/home"));
const ShoppingListing = React.lazy(() =>
  import("./pages/shopping-view/listing")
);
const ShoppingAccount = React.lazy(() =>
  import("./pages/shopping-view/account")
);
const CheckAuth = React.lazy(() => import("./components/common/check-auth"));

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
      {/* Suspense wraps lazy-loaded routes */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Root route to handle base URL */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/shop/home" replace />
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
          />

          {/* Authentication Routes */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          {/* Shopping Routes */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingViewLayout />
              </CheckAuth>
            }
          >
            <Route path="*" element={<NotFound />} />
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="account" element={<ShoppingAccount />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
