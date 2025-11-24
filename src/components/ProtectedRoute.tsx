import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
    const { user } = useStore();
    const location = useLocation();

    if (!user) {
        // Redirect to login, saving the current location they were trying to go to
        return <Navigate to={adminOnly ? "/admin/login" : "/login"} state={{ from: location }} replace />;
    }

    if (adminOnly && !user.isAdmin && user.role !== 'admin') {
        // If user is logged in but not admin, redirect to home or user dashboard
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
