import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./Pages/Home/Home";
import CategoriesPage from "./Pages/featuredCategories/Categories";
import AboutUs from "./Pages/About/About";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token); // Save token to local storage
      navigate("/"); // Redirect to homepage
    }
  }, []);

  return (
    <>
      <ToastContainer /> 
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default App;
