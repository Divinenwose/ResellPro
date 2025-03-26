import React from "react";
import "./About.css";
import heroImage from "../../assets/about_hero.png"; 
import womanPacking from "../../assets/about_image1.png"; 
import shoppingOnline from "../../assets/about_image2.png"; 
import cartImage from "../../assets/about_image3.png"; 
import Reviewimage from "../../assets/review_image.png";
import link_img from "../../assets/link_image.png"
import about_image4 from "../../assets/about_image4.png"
import about_image5 from "../../assets/about_image5.png"
import about_image6 from "../../assets/about_image6.png"
import about_image7 from "../../assets/about_image7.png"
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
        <img src={cartImage} alt="Shopping Cart" className="cta-image" />
        <div className="marketplace-text">
          <div className="marketplace-images">
            <img src={womanPacking} alt="Woman Packing" className="image-one" />
            <img src={shoppingOnline} alt="Shopping Online" />
          </div>
          <div className="market-place-writeup">
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
        </div>
      </section>
      <section className="features">
        <img src={link_img} className="link-image" alt="Users" />
        <h2>Discover Our Unique Features</h2>
        <div className="feature-list">
          <div className="feature">
            <img src={about_image4} alt="" />
            <div className="feature-writeup">
              <h3>Seamless Buyer-Seller Connections</h3>
              <p>
                Effortlessly navigate through our platform to connect with sellers
                offering a wide range of products, from new to recycled.
              </p>
            </div>
          </div>
          <div className="feature">
            <img src={about_image5} alt="" />
            <div className="feature-writeup ">
              <h3 className="tailored">Tailored Shopping Experience</h3>
              <p>
                Create personalized lists and filter searches to find exactly what
                you need while supporting sustainable shopping.
              </p>
            </div>
          </div>
          <div className="feature">
            <img src={about_image6} alt="" />
            <div className="feature-writeup">
              <h3>Rewarding Community Engagement</h3>
              <p>
                Join our community and earn rewards for participating in our
                marketplace, enhancing your shopping experience with exclusive
                benefits.
              </p>
            </div>
          </div>
          <div className="feature">
            <img src={about_image7} alt=""  />
            <div className="feature-writeup">
              <h3>Transparent Reviews & Feedback</h3>
              <p>
                Read and share reviews to help others make informed decisions and
                enhance the quality of our marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="cta-text">
          <h2>Unlock exclusive access to sustainable shopping with ResellPro!</h2>
          <button className="btn-primary">Shop Sustainable</button>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default AboutUs;
