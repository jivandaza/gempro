import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

const PrivateRouteAdmin = () => {
    const { user, token } = useAuth();

    if (!user || !token)
        return <Navigate to="/dashboard" />;

    if (user?.role === 'CLIENTE')
        return <Navigate to="/dashboard" />;

    return <Outlet />;
}

export default PrivateRouteAdmin;