import React, { useState } from "react";
import axios from "axios"; 
import "./AuthModal.css";
import GoogleIcon from "../../assets/google.png";
import FacebookIcon from "../../assets/facebook.png";

const AuthModal = ({ close }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState("Buyer");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", businessName: "", phone: "", category: "", location: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp ? "/api/auth/signup" : "/api/auth/login";
      const response = await axios.post(`http://localhost:5000${url}`, formData);

      console.log(response.data);
      alert(isSignUp ? "Account created successfully!" : "Logged in successfully!");

      localStorage.setItem("token", response.data.data.token); // Store token
      close(); // Close modal
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <button className="close-btn" onClick={close}>×</button>

        <h2>{isSignUp ? "Create an Account" : "Log In"}</h2>
        <p>{isSignUp ? "Join us and start ordering" : "Welcome back! Log into your account"}</p>

        <div className="toggle-container">
          <button className={userType === "Buyer" ? "active" : ""} onClick={() => setUserType("Buyer")}>Buyer</button>
          <button className={userType === "Seller" ? "active" : ""} onClick={() => setUserType("Seller")}>Seller</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Buyer Sign-Up */}
          {isSignUp && userType === "Buyer" && (
            <>
              <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </>
          )}

          {/* Seller Sign-Up */}
          {isSignUp && userType === "Seller" && (
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
            </>
          )}

          {/* Buyer Log-In */}
          {!isSignUp && userType === "Buyer" && (
            <>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </>
          )}

          {/* Seller Log-In */}
          {!isSignUp && userType === "Seller" && (
            <>
              <input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </>
          )}

          <button className="auth-btn" type="submit">{isSignUp ? "Create Account" : "Login"}</button>
          
          <div className="or-divider">— Other sign-up options —</div>
          <div className="social-login">
            <img className="google-icon" src={GoogleIcon} alt="Google" />
            <img className="facebook-icon" src={FacebookIcon} alt="Facebook" />
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
