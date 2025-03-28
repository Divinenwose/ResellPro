import React, { createContext, useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./Pages/Home/Home";
import CategoriesPage from "./Pages/featuredCategories/Categories";
import AboutUs from "./Pages/About/About";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a context for authentication
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const App = () => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false });
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token && !localStorage.getItem("token")) {
      localStorage.setItem("token", token);
      console.log(token);
      setAuth({ token, isAuthenticated: true });
      navigate("/");
      window.location.reload();
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setAuth({ token: storedToken, isAuthenticated: true });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <ToastContainer /> 
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <ProtectedRoute path="/protected" element={<ProtectedComponent />} /> */}
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
