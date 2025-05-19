// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
const { authToken} = useAuth();
  if (!authToken) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
