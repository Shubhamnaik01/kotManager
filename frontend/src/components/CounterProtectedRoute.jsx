import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

const CounterProtectedRoute = ({ children }) => {
  const { role } = useAuthStore();

  if (!role) return <Navigate to="/" />;
  if (role == "kitchen") return <Navigate to="/home" />;
  if (role == "admin") return <Navigate to="/manageUser" />;
  return children;
};

export default CounterProtectedRoute;
