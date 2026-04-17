import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { role } = useAuthStore();
  if (!role) return <Navigate to="/" />;
  if (role !== "admin") return <Navigate to="/home" />;
  return children;
};

export default AdminProtectedRoute;
