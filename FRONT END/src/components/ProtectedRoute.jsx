import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../App";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { auth } = useAuth();

  return (
    <Route
      {...rest}
      element={auth.isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute; 