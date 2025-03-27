import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Authmodal.css";
import GoogleIcon from "../../assets/google.png";
import FacebookIcon from "../../assets/facebook.png";

const AuthModal = ({ close }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState("buyer"); // Ensure lowercase "buyer"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    phone: "",
    category: "",
    location: "",
    role: "buyer",
  });

  // Update role when userType changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: userType }));
  }, [userType]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form for Sign-Up or Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp ? "/api/auth/signup" : "/api/auth/login";
      const payload = isSignUp
        ? userType === "buyer"
          ? { name: formData.name, email: formData.email, password: formData.password, role: userType } // Buyer sign-up
          : formData // Seller sign-up (all fields)
        : { email: formData.email, password: formData.password, role: userType }; // Login request

      const response = await axios.post(`http://localhost:5000${url}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (isSignUp) {
        toast.success("Sign-up successful! Please log in.");
        setTimeout(() => setIsSignUp(false), 2000); // Switch to login after 2 seconds
      } else {
        toast.success("User login successful!");
        localStorage.setItem("token", response.data.data.token);
        setTimeout(() => (window.location.href = "/"), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-modal">
      <ToastContainer />
      <div className="auth-container">
        <button className="close-btn" onClick={close}>×</button>

        <h2>{isSignUp ? "Create an Account" : "Log In"}</h2>
        <p>{isSignUp ? "Join us and start ordering" : "Welcome back! Log into your account"}</p>

        <div className="toggle-container">
          <button className={userType === "buyer" ? "active" : ""} onClick={() => setUserType("buyer")}>
            Buyer
          </button>
          <button className={userType === "seller" ? "active" : ""} onClick={() => setUserType("seller")}>
            Seller
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignUp && userType === "buyer" && (
            <>
              <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </>
          )}

          {/* Seller Sign-Up */}
          {isSignUp && userType === "seller" && (
            <>
              <input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <div className="flex-container">
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <select name="category" onChange={handleChange} required>
                  <option value="">Item Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </>
          )}

          {/* Login Form (Common for Buyers and Sellers) */}
          {!isSignUp && (
            <>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </>
          )}

          <button className="auth-btn" type="submit">{isSignUp ? "Create Account" : "Login"}</button>

          <div className="or-divider">— Other sign-up options —</div>
          <div className="social-login">
            <a href="http://localhost:5000/api/auth/google">
              <img className="google-icon" src={GoogleIcon} alt="Google" />
            </a>
            <a href="http://localhost:5000/api/auth/facebook">
              <img className="facebook-icon" src={FacebookIcon} alt="Facebook" />
            </a>
          </div>
        </form>

        <p className="auth-footer">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? "Login here" : "Sign up"}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
