
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('register'))) {
        console.log("Redirecting to login..."); // Debug
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('register'))) {
        if (user?.role === 'admin') {
            console.log("Redirecting admin to dashboard..."); // Debug
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            console.log("Redirecting user to shop..."); // Debug
            return <Navigate to="/shop/home" replace />;
        }
    }

    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes('/admin')) {
        console.log("Unauthorized access. Redirecting to unauth page..."); // Debug
        return <Navigate to="/unauth-page" replace />;
    }

    if (isAuthenticated && user?.role === "admin" && location.pathname.includes('/shop')) {
        console.log("Admin in shop route. Redirecting to dashboard..."); // Debug
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
}
export default CheckAuth;