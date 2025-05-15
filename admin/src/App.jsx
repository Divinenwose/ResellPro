import React, { createContext, useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Dashboard from './Pages/Dashboard/Dashboard';
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./components/RouteProtection/ProtectedRoute";
import Login from "./Pages/Login/Login";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const App = () => {
  const [auth, setAuth] = useState({ token: "loading", isAuthenticated: false, isAdmin: false, name: null });
const navigate = useNavigate();

useEffect(() => {
  const checkAuth = () => {
    const storedToken = localStorage.getItem("adminToken");

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token expired, log out user
          localStorage.removeItem("adminToken");
          setAuth({ token: null, isAuthenticated: false, isAdmin: false, name: null });
          window.location.reload();
        } else {
          let isAdmin = false;
          if(decodedToken.roles.includes("admin")){
            isAdmin = true;
          }
          setAuth({ token: storedToken, isAuthenticated: true, isAdmin, name: decodedToken.name });
        }
      } catch (error) {
        localStorage.removeItem("adminToken");
        setAuth({ token: null, isAuthenticated: false, isAdmin: false, name: null });
      }
    } else {
      setAuth({ token: null, isAuthenticated: false, isAdmin: false, name: null });
    }
  };

  checkAuth();
}, [navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <ToastContainer /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );

}

  

export default App;
