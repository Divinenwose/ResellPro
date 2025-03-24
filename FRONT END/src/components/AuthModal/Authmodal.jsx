import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Authmodal.css";
import GoogleIcon from "../../assets/google.png";
import FacebookIcon from "../../assets/facebook.png";

const AuthModal = ({ close, handleLogin, action }) => {
  const [isSignUp, setIsSignUp] = useState(action === "signup");
  const [userType, setUserType] = useState("Buyer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    phone: "",
    category: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login";

    const requestData = isSignUp
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: userType.toLowerCase(),
          ...(userType === "Seller" && {
            businessName: formData.businessName,
            phone: formData.phone,
            category: formData.category,
            location: formData.location,
          }),
        }
      : {
          email: formData.email,
          password: formData.password,
          role: userType.toLowerCase(),
        };

    try {
      const response = await axios.post(url, requestData);

      if (response.data.success) {
        toast.success(
          response.data.message ||
            (isSignUp ? "Account created successfully!" : "Logged in successfully!"),
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );

        localStorage.setItem("token", response.data.data.token);
        handleLogin();

        setTimeout(() => {
          if (isSignUp) {
            setIsSignUp(false);
          } else {
            close();
          }
        }, 2000);
      } else {
        throw new Error(response.data.message || "Unexpected response format");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong! Check the console.",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
    }
  };

  const handleGoogleLogin = () => {
    const googleAuthURL = "http://localhost:5000/api/auth/google";
    const newWindow = window.open(
      googleAuthURL,
      "_blank",
      "width=500,height=600"
    );
  
    // Check for token when window closes
    const checkPopupClosed = setInterval(() => {
      if (newWindow?.closed) {
        clearInterval(checkPopupClosed);
        const token = localStorage.getItem("token"); // Check if token is stored
        if (token) {
          toast.success("Google login successful!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
          handleLogin(); // Update UI
          close(); // Close modal
        } else {
          toast.error("Google login failed!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    }, 1000);
  };
  

  return (
    <div className="auth-modal">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="auth-container">
        <button className="close-btn" onClick={close}>×</button>
        <h2>{isSignUp ? "Create an Account" : "Log In"}</h2>
        <p>{isSignUp ? "Join us and start ordering" : "Welcome back! Log into your account"}</p>

        <div className="toggle-container">
          <button className={userType === "Buyer" ? "active" : ""} onClick={() => setUserType("Buyer")}>Buyer</button>
          <button className={userType === "Seller" ? "active" : ""} onClick={() => setUserType("Seller")}>Seller</button>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              {userType === "Buyer" ? (
                <>
                  <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                  <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                </>
              ) : (
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
            </>
          )}

          {!isSignUp && (
            <>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </>
          )}

          <button className="auth-btn" type="submit">
            {isSignUp ? "Create Account" : "Login"}
          </button>

          <div className="or-divider">— Other sign-up options —</div>
          <div className="social-login">
            <img className="google-icon" src={GoogleIcon} alt="Google" onClick={handleGoogleLogin} />
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
