import React from "react";
import "./About.css";
import heroImage from "../../assets/about_hero.png"; 
import womanPacking from "../../assets/about_image1.png"; 
import shoppingOnline from "../../assets/about_image2.png"; 
import cartImage from "../../assets/about_image3.png"; 
import Reviewimage from "../../assets/review_image.png";
import link_img from "../../assets/link_image.png"
import Footer from "../../components/Footer/Footer"

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Connect and Trade Sustainably</h1>
          <p>
            Join a community where buyers and sellers interact, offering new,
            used, and recycled products.
          </p>
          <button className="btn-primary">Browse Our Marketplace</button>
          <div className="stats">
            <img src={Reviewimage} className="review-img" alt="Users" />
          </div>
          <div className="about-effects">
            <img src={link_img} className="link-img" alt="Users" />
          </div>
        </div>
        <img src={heroImage} alt="Happy Woman Shopping" className="hero-image" />
      </section>
      <section className="marketplace">
        <div className="marketplace-text">
        <div className="marketplace-images">
          <img src={womanPacking} alt="Woman Packing" />
          <img src={shoppingOnline} alt="Shopping Online" />
        </div>
          <h2>
            Experience a vibrant marketplace where sustainability meets
            convenience at ResellPro
          </h2>
          <p>
            Our platform connects buyers and sellers, facilitating the trade of
            new, gently used, and recycled products. Enjoy the thrill of
            discovering unique items while contributing to a greener planet.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Discover Our Unique Features</h2>
        <div className="feature-list">
          <div className="feature">
            <span className="feature-icon">🔗</span>
            <h3>Seamless Buyer-Seller Connections</h3>
            <p>
              Effortlessly navigate through our platform to connect with sellers
              offering a wide range of products, from new to recycled.
            </p>
          </div>
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <h3>Tailored Shopping Experience</h3>
            <p>
              Create personalized lists and filter searches to find exactly what
              you need while supporting sustainable shopping.
            </p>
          </div>
          <div className="feature">
            <span className="feature-icon">🏆</span>
            <h3>Rewarding Community Engagement</h3>
            <p>
              Join our community and earn rewards for participating in our
              marketplace, enhancing your shopping experience with exclusive
              benefits.
            </p>
          </div>
          <div className="feature">
            <span className="feature-icon">⭐</span>
            <h3>Transparent Reviews & Feedback</h3>
            <p>
              Read and share reviews to help others make informed decisions and
              enhance the quality of our marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <img src={cartImage} alt="Shopping Cart" className="cta-image" />
        <div className="cta-text">
          <h2>Unlock exclusive access to sustainable shopping with ResellPro!</h2>
          <button className="btn-primary">Shop Sustainable</button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
