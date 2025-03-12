import React, { useState } from "react";
import "./Categories.css";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/Searchbar/Searchbar";
import phoneIcon from "../../assets/phone.png";
import kitchenIcon from "../../assets/kitchen_icon.png";
import carIcon from "../../assets/car_icon.png";
import propertiesIcon from "../../assets/house.png";
import menIcon from "../../assets/cloth_icon.png";
import womenIcon from "../../assets/women_icon.png";
import skincareIcon from "../../assets/skincare_icon.png";
import item1 from "../../assets/item1.png";
import item2 from "../../assets/item2.png";
import item3 from "../../assets/item3.png";
import item4 from "../../assets/item4.png";
import item5 from "../../assets/item5.png";
import item6 from "../../assets/item6.png";
import item7 from "../../assets/item7.png";
import item8 from "../../assets/item8.png";
import item9 from "../../assets/item9.png";
import item10 from "../../assets/item10.png";
import Footer from "../../components/Footer/Footer";

const featuredCategories = [
  { name: "Phones & Accessories", icon: phoneIcon },
  { name: "Kitchen Appliances", icon: kitchenIcon },
  { name: "Cars", icon: carIcon },
  { name: "Properties", icon: propertiesIcon },
  { name: "Men Fashion", icon: menIcon },
  { name: "Women Fashion", icon: womenIcon },
  { name: "Skincare Products", icon: skincareIcon },
];

const products = [
  { id: 1, name: "6L Oraimo Airfryer", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Kitchen Appliances", price: 65000, image: item1 },
  { id: 2, name: "Smartphone", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Phones & Accessories", price: 120000, image: item2 },
  { id: 3, name: "Toyota Corolla", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Cars", price: 5000000, image: item3 },
  { id: 4, name: "Apartment for Rent", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Properties", price: 700000, image: item4 },
  { id: 5, name: "Men Sneakers", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Men Fashion", price: 35000, image: item5 },
  { id: 6, name: "Women Handbag", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Women Fashion", price: 25000, image: item6 },
  { id: 7, name: "Skincare Set", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Skincare Products", price: 45000, image: item7 },
  { id: 8, name: "Laptop", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Phones & Accessories", price: 300000, image: item8 },
  { id: 9, name: "Blender", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Kitchen Appliances", price: 50000, image: item9 },
  { id: 10, name: "Luxury Wristwatch", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Men Fashion", price: 75000, image: item10 },
  { id: 11, name: "Toyota Corolla", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Cars", price: 45000, image: item7 },
  { id: 12, name: "Skincare Set", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Skincare Products", price: 45000, image: item7 },
  { id: 13, name: "Apartment for Rent", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Properties", price: 45000, image: item7 },
  { id: 14, name: "Smartphone", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Phones & Accessories", price: 45000, image: item7 },
  { id: 15, name: "Toyota Corolla", description:"Eliminate the excess fat associated with frying and create a range of delicious meals using the hot....", category: "Cars", price: 45000, image: item7 },
];

const priceRanges = [
  { label: "Under 20k", min: 0, max: 20000 },
  { label: "20k - 100k", min: 20000, max: 100000 },
  { label: "100k - 500k", min: 100000, max: 500000 },
  { label: "500k - 5M", min: 500000, max: 5000000 },
];

const moreOptions = ["Show all", "New Listing", "Previous Listing"];

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedMoreOptions, setSelectedMoreOptions] = useState([]);

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRanges((prevRanges) =>
      prevRanges.includes(range)
        ? prevRanges.filter((r) => r !== range)
        : [...prevRanges, range]
    );
  };

  const handleMoreOptionsChange = (option) => {
    setSelectedMoreOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((o) => o !== option)
        : [...prevOptions, option]
    );
  };

  const applyFilters = () => {
    let minPrice = Math.min(...selectedPriceRanges.map((r) => r.min), priceFilter.min || Infinity);
    let maxPrice = Math.max(...selectedPriceRanges.map((r) => r.max), priceFilter.max || 0);

    if (minPrice === Infinity) minPrice = "";
    if (maxPrice === 0) maxPrice = "";

    setPriceFilter({ min: minPrice, max: maxPrice });
  };

  const filteredProducts = products.filter((product) => {
    const inCategory = selectedCategory === "All" || product.category === selectedCategory;
    const inPriceRange =
      (!priceFilter.min || product.price >= parseInt(priceFilter.min)) &&
      (!priceFilter.max || product.price <= parseInt(priceFilter.max));
    return inCategory && inPriceRange;
  });

  return (
    <div className="container">
      <div className="hero-container">
        <Hero />
        <SearchBar />
      </div>
      <div className="container-content">
        <aside className="sidebar">
          <div className="featured-categories-container">
            <h3>Featured Categories</h3>
            <ul>
              <li className={selectedCategory === "All" ? "active" : ""} onClick={() => setSelectedCategory("All")}>
                All Categories
              </li>
              {featuredCategories.map((category, index) => (
                <li key={index} className={selectedCategory === category.name ? "active" : ""} onClick={() => setSelectedCategory(category.name)}>
                  <img src={category.icon} alt={category.name} className="category-icon" />
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="price-container">
            <h3>Price</h3>
            <div className="line"></div>
            <div className="price-filter">
              <input type="number" placeholder="Min" value={priceFilter.min} onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })} />
              <input type="number" placeholder="Max" value={priceFilter.max} onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })} />
            </div>
            <div className="price-option-container">
              {priceRanges.map((range, index) => (
                <label key={index} className="price-option">
                  <div className="label-name">{range.label}</div>
                  <input type="checkbox" checked={selectedPriceRanges.includes(range)} onChange={() => handlePriceRangeChange(range)} />
                </label>
              ))}
            </div>
          </div>
          <div className="more-options">
            <h3>More Options</h3>
            <div className="line"></div>
            <div className="more-option-container">
              {moreOptions.map((option, index) => (
                <label key={index} className="more-option">
                  <div className="option-container">{option}</div>
                  <input type="checkbox" checked={selectedMoreOptions.includes(option)} onChange={() => handleMoreOptionsChange(option)} />
                </label>
              ))}
            </div>
          </div>
          <button onClick={applyFilters} className="apply-filter">Apply Filter</button>
        </aside>
        <main className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₦{product.price.toLocaleString()}</p>
                <p className="product-description">{product.description}</p>
              </div>
            ))
          ) : (
            <p className="no-products-container">No products available.</p>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
