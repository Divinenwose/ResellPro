import React from "react";
import "./recycled.css";
import eco1 from "../../assets/eco1.png"
import eco2 from "../../assets/eco2.png"
import eco3 from "../../assets/eco3.png"
import recycleitem from "../../assets/recycle-item.png"
import Footer from "../../components/Footer/Footer"

const RecycledPage = () =>{
    return(
        <div className="recycled-page">
            <section className="recycled-hero-container">
                <div className="recycled-hero">
                    <h2>How Our Recycling Process Works?</h2>
                    <h4>Making sustainability simple & Impactful</h4>
                    <button className="shop-eco-btn">Shop Eco-Friendly</button>
                </div>
            </section>
            <section className="ecofriendly-container">
                <div className="ecofriendly-content">
                    <h2>Eco- Friendly Products</h2>
                    <div className="ecofriendly-items-container">
                        <div className="ecofriendly-item">
                            <img src={eco1} alt="" />
                            <h4>Plastics</h4>
                        </div>
                        <div className="ecofriendly-item">
                            <img src={eco2} alt="" />
                            <h4>Fabrics</h4>
                        </div>
                        <div className="ecofriendly-item">
                            <img src={eco3} alt="" />
                            <h4>Electronics</h4>
                        </div>
                    </div>
                </div>
            </section>
            <section className="why-recycle">
                <div className="why-recycle-content">
                    <h2>Why Recycle your Items?</h2>
                    <div className="why-recycle-container">
                        <div className="left-side">
                            <p>We give used materials a second life, reducing waste and promoting sustainability. Here's how we do it!</p>
                            <ol>
                                <li>Collection - Gathering used items from customers, local waste sources, or donations.</li>
                                <li>Sorting & Processing - Sorting items based on material type (plastic, fabric, electronics, etc.).</li>
                                <li>Upcycling & Repurposing - Cleaning, repairing, or transforming items into new products.</li>
                                <li>Ready for Sale - Listing finished products in the recycled collection</li>
                            </ol>
                        </div>
                        <div className="right-side">
                            <img src={recycleitem} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="recycle-benefit">
                <div className="recycle-benefit-content">
                    <h2>Benefits for Recycling</h2>
                    <ul>
                        <li>✅ Reduces landfill waste</li>
                        <li>✅ Saves energy & resources </li>
                        <li>✅ Supports local artisans & businesses</li>
                        <li>✅ Promotes a circular economy</li>
                    </ul>
                    <button className="donate-btn">Donate Your Used Items</button>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default RecycledPage