import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img className="nav-logo" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="nav-links-container">
        <ul className="nav-links">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to="/about">About us</Link>
          </li>
          <li className={location.pathname === "/products" ? "active" : ""}>
            <Link to="/products">Products</Link>
          </li>
          <li className={location.pathname === "/categories" ? "active" : ""}>
            <Link to="/categories">Featured categories</Link>
          </li>
        </ul>
      </div>
      <div className="nav-btn">
        <Link to="/register" className="nav-btn">Register Now</Link>
      </div>
    </div>
  );
};

export default Navbar;
