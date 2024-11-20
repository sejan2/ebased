import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React, { Suspense } from "react";
import { checkAuth } from "./store/auth-slice";

// Lazy imports
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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Default Route */}
          <Route
            path="/"
            element={
              isAuthenticated
                ? user?.role === "admin"
                  ? <Navigate to="/admin/dashboard" replace />
                  : <Navigate to="/shop/home" replace />
                : <Navigate to="/shop/home" replace />
            }
          />

          {/* Authentication Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          {/* Admin Routes (Protected) */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user} isAdminRequired={true}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          {/* Shop Routes (Open for all users, but admin is redirected) */}
          <Route
            path="/shop"
            element={
              user?.role === "admin"
                ? <Navigate to="/admin/dashboard" replace /> // Redirect admins from shop to admin dashboard
                : <ShoppingViewLayout /> // Non-admin users can access shop routes
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>


      </Suspense>
    </div>
  );
}

export default App;
