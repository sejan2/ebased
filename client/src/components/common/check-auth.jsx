import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // Case 1: Admin users trying to access shop routes
    if (user?.role === "admin" && location.pathname.startsWith('/shop')) {
        console.log("Admin trying to access shop - Redirecting to admin dashboard...");
        return <Navigate to="/admin/dashboard" replace />;
    }

    // Case 2: Normal users trying to access admin routes
    if (user?.role !== "admin" && location.pathname.startsWith('/admin')) {
        console.log("Unauthorized access to admin routes - Redirecting to shop...");
        return <Navigate to="/shop/home" replace />;
    }

    // Case 3: Unauthenticated users trying to access admin routes
    if (!isAuthenticated && location.pathname.startsWith('/admin')) {
        console.log("Unauthenticated - Redirecting to login...");
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}

export default CheckAuth;

