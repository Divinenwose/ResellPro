import React, { useEffect, useState } from "react";
import { useAuth } from "../../App";
import Footer from "../../components/Footer/Footer";
import "./SellerProfile.css";
import seller_icon from "../../assets/seller_icon.png";
import click_icon from "../../assets/click_icon.png";
import search_icon from "../../assets/search_icon.png";
import VerificationModal from "../../components/VerificationModal/verificationmodal"
import view_icon from "../../assets/view_icon.png";
import axios from "axios";

const SellerProfile = () => {
    const { auth } = useAuth();
    const [businessName, setBusinessName] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [messages, setMessages] = useState([]);
    const [publishedItems, setPublishedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const apiURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

    useEffect(() => {
        const fetchSellerProfile = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/seller/profile-details`, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setBusinessName(response.data.data.businessName);
                setDescription(response.data.data.description);
                setPhone(response.data.data.phone);
                setEmail(response.data.data.email);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/seller/messages`, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setMessages(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchPublishedItems = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/seller/published-items`, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setPublishedItems(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSellerProfile();
        fetchMessages();
        fetchPublishedItems();
    }, []);

    return (
        <div className="seller-profile">
            <section className="profile-info">
                <div className="business-details">
                    <div className="business-name">
                        <img src={seller_icon} alt="" />
                        <h2>{businessName}</h2>
                    </div>
                    <p>{description}</p>
                    <div className="post-analysis">
                        <h2 className="heading">Post Analysis</h2>
                        <div className="post-analysis-content">
                            <div className="analysis">
                                <img src={click_icon} alt="" />
                                <p>250</p>
                                <h4>Post clicks</h4>
                            </div>
                            <div className="analysis">
                                <img src={view_icon} alt="" />
                                <p>150</p>
                                <h4>Views</h4>
                            </div>
                            <div className="analysis">
                                <img src={search_icon} alt="" />
                                <p>20</p>
                                <h4>Post searched</h4>
                            </div>
                        </div>
                    </div>
                    <button className="verify-btn" onClick={() => setIsModalOpen(true)}>Apply For Verification</button>
                    <button className="analysis-btn">View Analysis</button>
                </div>

                <div className="messages">
                    <h3>Messages</h3>
                    <input type="text" placeholder="Search messages" className="search-box" />
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>
                                <strong>{msg.sender}</strong>
                                <p>{msg.text}</p>
                                <span>{msg.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="items-published">
                <h2>Items Published</h2>
                <div className="items-grid">
                    {publishedItems.map((item, index) => (
                        <div key={index} className="item-card">
                            <h3>{item.name}</h3>
                            <p>₦{item.price}</p>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
                <button className="see-listing">See all Listing</button>
            </section>

            <section className="publish-item">
                <h2>Publish an Item</h2>
                <p>Upload Quality Images</p>
                <div className="image-upload">
                    <span>+</span>
                    <p>Add one or more images</p>
                </div>
                <form className="publish-form">
                    <label>Description</label>
                    <textarea placeholder="Product description"></textarea>
                    <div className="pricing-flex">
                        <div className="input-group">
                            <label>Pricing</label>
                            <input type="text" placeholder="Price" />
                        </div>

                        <div className="item-condition">
                            <h2>Condition of Item</h2>
                            <div className="checkbox">
                                <label><input type="checkbox" /> Brand New</label>
                                <label><input type="checkbox" /> Recycled Goods</label>
                                <label><input type="checkbox" /> Used</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-flex">
                        <div className="input-group">
                            <label>Delivery Option</label>
                            <input type="text" placeholder="Delivery option" />
                        </div>
                        <div className="input-group">
                            <label>Location</label>
                            <input type="text" placeholder="Location" />
                        </div>
                    </div>
                    <button type="submit" className="publish-btn">Publish Listing</button>
                </form>
            </section>
            <VerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <Footer />
        </div>
    );
};

export default SellerProfile;
