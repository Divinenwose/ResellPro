import React, { useState } from "react";
import "./AuthModal.css";
import GoogleIcon from "../../assets/google.png";
import FacebookIcon from "../../assets/facebook.png";

const AuthModal = ({ close }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState("Buyer");

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <button className="close-btn" onClick={close}>×</button>

        <h2>{isSignUp ? "Create an Account" : "Log In"}</h2>
        <p>{isSignUp ? "Join us and start ordering" : "Welcome back! Log into your account"}</p>

        <div className="toggle-container">
          <button
            className={userType === "Buyer" ? "active" : ""}
            onClick={() => setUserType("Buyer")}
          >
            Buyer
          </button>
          <button
            className={userType === "Seller" ? "active" : ""}
            onClick={() => setUserType("Seller")}
          >
            Seller
          </button>
        </div>

        <form>
          {/* Buyer Sign-Up */}
          {isSignUp && userType === "Buyer" && (
            <>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
            </>
          )}

          {/* Seller Sign-Up */}
          {isSignUp && userType === "Seller" && (
            <>
              <input type="text" placeholder="Business Name" required />
              <input type="email" placeholder="Email" required />
              <div className="flex-container">
                <input type="tel" placeholder="Phone Number" required />
                <select required>
                  <option value="">Item Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <input type="text" placeholder="Location" required />
            </>
          )}

          {/* Buyer Log-In */}
          {!isSignUp && userType === "Buyer" && (
            <>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
            </>
          )}

          {/* Seller Log-In */}
          {!isSignUp && userType === "Seller" && (
            <>
              <input type="text" placeholder="Business Name" required />
              <input type="password" placeholder="Password" required />
            </>
          )}

          <button className="auth-btn">
            {isSignUp ? "Create Account" : "Login"}
          </button>
          
          <div className="or-divider">— Other sign-up options —</div>
          <div className="social-login">
            <img className="google-icon" src={GoogleIcon} alt="Google" />
            <img className="facebook-icon" src={FacebookIcon} alt="Facebook" />
          </div>
        </form>

        <p className="auth-footer">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login here" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
