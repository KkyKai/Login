import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Define the type of allowedRoles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  const { role, name } = currentUser;

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  if (name) {
    return <Navigate to="/Unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
