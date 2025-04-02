import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../App";

const ProtectedRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();
  // console.log("Auth state:", auth);

  if (auth.token === "loading") {
    return <div>Loading...</div>;
  }

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" state={{ showLogin: true, from: location.pathname }} />;
};

export default ProtectedRoute;