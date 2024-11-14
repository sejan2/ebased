import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();
    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('register'))
    ) {
        return <Navigate to="/auth/login"></Navigate>
    }
    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('register'))) {
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard"></Navigate>
        } else {
            return <Navigate to="/shop/home"></Navigate>
        }
    }
    if (isAuthenticated && user?.role !== "admin" && (location.pathname.includes('admin'))
    ) {
        return <Navigate to="/unauth-page"></Navigate>
    }
    if (isAuthenticated && user?.role === "admin" && (location.pathname.includes('shop'))
    ) {
        return <Navigate to="/admin/dashboard"></Navigate>
    }

    return <>{children}</>
}

export default CheckAuth;