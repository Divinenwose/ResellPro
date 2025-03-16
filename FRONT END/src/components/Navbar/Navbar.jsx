import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "../../components/AuthModal/Authmodal";
import "./Navbar.css";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img className="nav-logo" src={Logo} alt="Logo" />
        </Link>
      </div>

      <button className="nav-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>
        ☰
      </button>

      <div className={`nav-links-container ${isNavOpen ? "active" : ""}`}>
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

        <div className="nav-btn-container">
          {isLoggedIn ? (
            <div className="user-menu">
              <span className="user-icon">👤</span>
              <ul className="dropdown">
                <li onClick={handleLogout}>Sign Out</li>
              </ul>
            </div>
          ) : (
            <button className="nav-btn" onClick={() => setIsAuthOpen(true)}>
              Register Now
            </button>
          )}
        </div>
      </div>

      {isAuthOpen && <AuthModal close={() => setIsAuthOpen(false)} />}
    </div>
  );
};

export default Navbar;
