import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ListedProject.css";
import { CartContext } from "../../CartContext";
import image1 from "../../assets/item0.png";
import image2 from "../../assets/item1.png";
import image3 from "../../assets/item2.png";
import image4 from "../../assets/item3.png";
import image5 from "../../assets/item4.png";
import image6 from "../../assets/item5.png";
import image7 from "../../assets/item6.png";
import image8 from "../../assets/item7.png";
import image9 from "../../assets/item8.png";
import image10 from "../../assets/item9.png";
import image11 from "../../assets/item10.png";
import image12 from "../../assets/item21.png";
import lowersection from "../../assets/lower_section.png";
import SearchBar from "../../components/Searchbar/Searchbar";

const statesInNigeria = [
  "All states", "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const listedItems = [
  { id: 1, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image1, status: "New", state: "Lagos" },
  { id: 2, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image2, status: "Old", state: "Abuja" },
  { id: 3, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image3, status: "New", state: "Kano" },
  { id: 4, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image4, status: "Old", state: "Lagos" },
  { id: 5, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image5, status: "New", state: "Abuja" },
  { id: 6, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image6, status: "Old", state: "Kano" },
  { id: 7, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image7, status: "New", state: "Lagos" },
  { id: 8, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image8, status: "Old", state: "Abuja" },
  { id: 9, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image9, status: "New", state: "Kano" },
  { id: 10, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image10, status: "Old", state: "Lagos" },
  { id: 11, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image11, status: "New", state: "Abuja" },
  { id: 12, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image12, status: "Old", state: "Rivers" },
];


const ListedProject = () => {
  const [selectedState, setSelectedState] = useState("All states");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const navigate = useNavigate();
  const { addToCart, cartCount } = useContext(CartContext);

  const handleProductClick = (product) => {
    navigate("/product-detail", { state: { product } });
  };

  const handleAddToCart = (item) => {
    const product = {
      _id: item.id,  
      name: item.title,
      price: parseFloat(item.price.replace('₦', '').replace(',', '')),  
      image: item.image,
      quantity: 1  
    };
    addToCart(product);
  };

  return (
    <div className="listed-container">
      <div className="header">
        <h2 className="title">Trending Items</h2>
        <div className="filters">
          <div className="select-container">
            <select
              className="dropdown"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {statesInNigeria.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
            <select
              className="dropdown-selected"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="New">New</option>
              <option value="Old">Old</option>
            </select>
          </div>
        </div>
      </div>
      <div className="searchbar-wrapper">
        <SearchBar  />
      </div>
      <div className="grid">
        {listedItems
          .filter(item =>
            (selectedState === "All states" || item.state === selectedState) &&
            (selectedStatus === "All" || item.status === selectedStatus)
          )
          .map((item) => (
            <div key={item.id} className="card" onClick={() => handleProductClick(item)}>
              <img src={item.image} alt={item.title} className="card-image" />
              <h4 className="card-title">{item.title}</h4>
              <p className="card-price">{item.price}</p>
              <p className="card-state">{item.state}</p>
              <button
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);  
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
      <div className="writeup">
        <div className="left">
          <h2>Unlock your Marketplace Potential with Resellerpro</h2>
          <p>Experience seamless access to thousands of listings for used, new, and recycled items. Resellpro streamlines your shopping experience, providing detailed seller profiles and ratings that ensure transparency and trust in every transaction</p>
          <div className="unlock-link">
            <a href="">Become a Seller</a>
          </div>
        </div>
        <div className="right">
          <img className="right-img" src={lowersection} alt="Reseller Promo" />
        </div>
      </div>
    </div>
  );
};


export default ListedProject;
