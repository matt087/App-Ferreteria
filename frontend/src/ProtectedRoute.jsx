import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!token || !userData || userData.role !== 1) {
    return <Navigate to="/login" replace />; 
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
