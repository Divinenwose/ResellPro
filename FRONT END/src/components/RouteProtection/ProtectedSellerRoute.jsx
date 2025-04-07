import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../App";

const ProtectedSellerRoute = () => {
  const { auth } = useAuth();

  if (auth.token === "loading") {
    return <div>Loading...</div>;
  }

  if(auth.isSeller){
    return <Outlet />;
  }
  return <Navigate to="/403"/>;
};

export default ProtectedSellerRoute;