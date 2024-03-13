import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Define the type of allowedRoles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  console.log("Current user in ProtectedRouteProps:", currentUser);
  if (!currentUser) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  const { role } = currentUser;

  // Check if the current user's role is included in the allowed roles
  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
