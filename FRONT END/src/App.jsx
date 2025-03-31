import React, { createContext, useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./Pages/Home/Home";
import RecycledPage from "./Pages/Recycled/recycled";
import CategoriesPage from "./Pages/featuredCategories/Categories";
import AboutUs from "./Pages/About/About";
import ProtectedRoute from "./components/ProtectedRoute";
import { jwtDecode } from "jwt-decode";
  
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const App = () => {
  const [auth, setAuth] = useState({ token: "loading", isAuthenticated: false });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            // Token expired, log out user
            localStorage.removeItem("token");
            setAuth({ token: null, isAuthenticated: false });
            window.location.reload();
          } else {
            setAuth({ token: storedToken, isAuthenticated: true });
          }
        } catch (error) {
          localStorage.removeItem("token");
          setAuth({ token: null, isAuthenticated: false });
        }
      } else {
        setAuth({ token: null, isAuthenticated: false });
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <ToastContainer /> 
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/recycled" element={<RecycledPage />} />
        <Route path="/about" element={<AboutUs />} />

        {/* add all protected routes under here */}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/dashboard" element={<Example />} /> */}
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
