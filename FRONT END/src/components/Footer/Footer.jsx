import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import "./Footer.css";
import FooterLogo from "../../assets/flogo.png";
import Twitter_icon from "../../assets/twitter.png";
import Instagram_icon from "../../assets/instagram.png";
import Facebook_icon from "../../assets/facebook.png";
import effect1 from "../../assets/effect1.png";
import effect2 from "../../assets/effect2.png";
import effect3 from "../../assets/effect3.png";

const Footer = () => {
    const location = useLocation();

    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <div className="footer">
            <div className="footer-details">
                <div className="footer-logo-container">
                    <img src={FooterLogo} className="footer-logo" alt="Footer Logo" />
                </div>
                <div className="footer-links">
                    <ul className="links">
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
                <div className="social-icons">
                    <div className="facebook-container">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={Facebook_icon} alt="Facebook" className="icons" />
                        </a>
                    </div>
                    <div className="instagram-container">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={Instagram_icon} alt="Instagram" className="icons" />
                        </a>
                    </div>
                    <div className="twitter-container">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <img src={Twitter_icon} alt="Twitter" className="icons" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="effects">
                <img src={effect1} className="effect-one" alt="Effect 1" />
                <img src={effect2} className="effect-two" alt="Effect 2" />
                <img src={effect3} className="effect-three" alt="Effect 3" />
            </div>
            <div className="copywrite">
                <p>&copy; copyright resellpro.com 2025. All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;
