import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "../../components/AuthModal/Authmodal";
import "./Navbar.css";
import Logo from "../../assets/Logo.png";
import Notification_icon from "../../assets/notification.png";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [authAction, setAuthAction] = useState("signup");

  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    // console.log(token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    localStorage.setItem("token", "dummy_token");
  };

  const handleLogout = async (e) => {
    try {
      const url = "/api/auth/logout";
      const payload = {
        token: localStorage.getItem("token"),
      };

      const response = await axios.post(`http://localhost:5000${url}`, payload, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });
      setIsLoggedIn(false);
      setIsDropdownOpen(false);
      localStorage.removeItem("token");
      toast.success("Logout successful!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="logo-container">
        <Link to="/">
          <img className="nav-logo" src={Logo} alt="Logo" />
        </Link>
      </div>

      {/* Toggle Button for Mobile */}
      <button className="nav-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>
        ☰
      </button>

      <div className={`nav-links-container ${isNavOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/products" ? "active" : ""}>
            <Link to="/products">Recycled</Link>
          </li>
          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to="/about">About us</Link>
          </li>
          <li className={location.pathname === "/categories" ? "active" : ""}>
            <Link to="/categories">Featured categories</Link>
          </li>
        </ul>

        <div className="nav-btn-container">
          <img className="notification-icon" src={Notification_icon} alt="Notifications" />

          {isLoggedIn ? (
            <div className="user-menu" ref={dropdownRef}>
              <span
                className="user-icon"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                👤
              </span>
              <div className="drop-down-container">
                <ul className={`dropdown ${isDropdownOpen ? "active" : ""}`}>
                  <li>
                    <Link to="/dashboard">My Dashboard</Link>
                  </li>
                  <li onClick={handleLogout}>Sign Out</li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              className="nav-btn"
              onClick={() => {
                setIsAuthOpen(true);
                setAuthAction("signup");
              }}
            >
              Register Now
            </button>
          )}
        </div>
      </div>

      {isAuthOpen && (
        <AuthModal
          close={() => setIsAuthOpen(false)}
          handleLogin={handleLogin}
          action={authAction}
        />
      )}
    </nav>
  );
};

export default Navbar;
