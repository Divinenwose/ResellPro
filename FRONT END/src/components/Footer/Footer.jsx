import React from "react";
import "./Footer.css"
import FooterLogo from "../../assets/fLogo.png"
import Instagram_icon from "../../assets/instagram_icon.png"
import Facebook_icon from "../../assets/facebook_icon.png"
import Twitter_icon from "../../assets/twitter_icon.png"
import effect1 from "../../assets/effect1.png"
import effect2 from "../../assets/effect2.png"
import effect3 from "../../assets/effect3.png"


const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-details">
                <div className="footer-logo-container">
                    <img src={FooterLogo} className="footer-logo" alt="" />
                </div>
                <div className="footer-links">
                    <ul className="links">
                        <li><a href="">Home</a></li>
                        <li><a href="">Featured Categories</a></li>
                        <li><a href="">About Us</a></li>
                    </ul>
                </div>
                <div className="social-icons">
                    <a href=""><img src={Facebook_icon} alt="" className="icons" /></a>
                    <a href=""><img src={Instagram_icon} alt="" className="icons" /></a>
                    <a href=""><img src={Twitter_icon} alt="" className="icons" /></a>
                </div>
            </div>
            <div className="effects">
                <img src={effect1} className="effect-one" alt="" />
                <img src={effect2} className="effect-two" alt="" />
                <img src={effect3} className="effect-three" alt="" />
            </div>
            <div className="copywrite">
                <p>&copy; copyright resellpro.com 2025. All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer;