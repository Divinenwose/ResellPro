import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../App";
import Footer from "../../components/Footer/Footer";
import "./SellerProfile.css";
import seller_icon from "../../assets/seller_icon.png";
import click_icon from "../../assets/click_icon.png";
import search_icon from "../../assets/search_icon.png";
import VerificationModal from "../../components/VerificationModal/verificationmodal";
import view_icon from "../../assets/view_icon.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerProfile = () => {
  const { auth } = useAuth();
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [publishedItems, setPublishedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [showListing, setShowListing] = useState(false);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [location, setLocation] = useState("");

  const fileInputRef = useRef(null);
  const apiURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/listing-categories`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    const fetchSellerProfile = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/seller/profile-details`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setBusinessName(response.data.data.businessName);
        setDescription(response.data.data.description);
        setPhone(response.data.data.phone);
        setEmail(response.data.data.email);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile details");
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/seller/messages`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setMessages(response.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages");
      }
    };

    const fetchPublishedItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiURL}/api/listings`, {
          headers: { Authorization: `Bearer ${auth.token}` },
          params: {
            limit: 100
          }
        });
        
        const sellerListings = response.data.data.filter(
          listing => listing.seller._id === auth.userId
        );
        
        setPublishedItems(sellerListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast.error("Failed to load published items");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    fetchSellerProfile();
    fetchMessages();
    fetchPublishedItems();
  }, [auth.token, auth.userId, apiURL]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
      setImages(files);
    }
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    setPrice(value);
  };

  const validateForm = () => {
    if (!itemDescription) {
      toast.error("Please provide a description");
      return false;
    }
    if (!price) {
      toast.error("Please provide a price");
      return false;
    }
    if (!category) {
      toast.error("Please select a category");
      return false;
    }
    if (!condition) {
      toast.error("Please select a condition");
      return false;
    }
    if (!location) {
      toast.error("Please select a location");
      return false;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("description", itemDescription);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("deliveryOption", deliveryOption);
    formData.append("location", location);
    formData.append("category_id", category);
    formData.append("isEcoFriendly", condition === "Recycled Goods" ? "true" : "false");
    formData.append("autoRelist", "false");
    
    images.forEach((img) => formData.append("images", img));

    try {
      const response = await axios.post(`${apiURL}/api/listings/create`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Listing published successfully!");
      setPublishedItems((prev) => [response.data.data, ...prev]);
      
      // Reset form
      setItemDescription("");
      setPrice("");
      setCategory("");
      setCondition("");
      setDeliveryOption("");
      setLocation("");
      setImagePreviews([]);
      setImages([]);
    } catch (error) {
      console.error("Error submitting listing:", error);
      const errorMessage = error.response?.data?.message || "Failed to publish listing";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (item) => {
    toast.info(`Viewing details for: ${item.title || item.description}`);
  };

  const handleAddToCart = (item) => {
    toast.success(`Added ${item.title || item.description} to cart!`);
  };

  const handleDeleteListing = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }
    
    try {
      await axios.delete(`${apiURL}/api/listings/${itemId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      
      setPublishedItems(prevItems => prevItems.filter(item => item._id !== itemId));
      toast.success("Listing deleted successfully");
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing");
    }
  };

  return (
    <div className="seller-profile">
      <ToastContainer position="top-right" autoClose={3000} />
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
          <button className="verify-btn" onClick={() => setIsModalOpen(true)}>
            Apply For Verification
          </button>
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
        {isLoading ? (
          <div className="loading">Loading published items...</div>
        ) : publishedItems.length === 0 ? (
          <div className="no-items">No items published yet</div>
        ) : (
          <div className="items-grid">
            {publishedItems.slice(0, 4).map((item) => (
              <div key={item._id} className="item-card">
                {item.images && item.images.length > 0 && (
                  <img 
                    src={item.images[0].image_url} 
                    alt={item.title || item.description} 
                    className="item-image"
                  />
                )}
                <h3>{item.title || item.description.substring(0, 30)}</h3>
                <p>₦{item.price}</p>
                <p className="item-description">{item.description.substring(0, 60)}...</p>
                <p className="item-condition">{item.condition}</p>
              </div>
            ))}
          </div>
        )}
        <button className="see-listing" onClick={() => setShowListing(true)}>
          See all Listing
        </button>
      </section>

      {showListing && (
        <section className="listing-modal">
          <button className="close-listing" onClick={() => setShowListing(false)}>
            Close
          </button>
          <div className="cards-container">
            {publishedItems.map((item) => (
              <div
                key={item._id}
                className="card"
                onClick={() => handleProductClick(item)}
              >
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].image_url}
                    alt={item.title || item.description}
                    className="card-image"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <h4 className="card-title">{item.title || item.description.substring(0, 30)}</h4>
                <p className="card-price">₦{item.price}</p>
                <p className="card-state">{item.location || "Unknown"}</p>
                <div className="card-actions">
                  <button
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteListing(item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="publish-item">
        <h2>Publish an Item</h2>
        <p>Upload Quality Images</p>

        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <div className="image-upload" onClick={handleImageUpload}>
          {imagePreviews.length === 0 ? (
            <>
              <span>+</span>
              <p>Add one or more images</p>
            </>
          ) : (
            <div className="image-previews">
              {imagePreviews.map((preview, index) => (
                <img 
                  key={index} 
                  src={preview} 
                  alt={`preview-${index}`} 
                  className="preview-image" 
                />
              ))}
            </div>
          )}
        </div>

        <form className="publish-form" onSubmit={handleSubmit}>
          <label>Description</label>
          <textarea
            placeholder="Product description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          ></textarea>

          <div className="pricing-flex">
            <div className="input-group">
              <label>Pricing</label>
              <div className="price-input">
                <span>₦</span>
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={handlePriceChange}
                  required
                />
              </div>
            </div>

            <div className="item-condition">
              <h2>Condition of Item</h2>
              <div className="checkbox">
                <label>
                <input
                  type="radio"
                  value="Brand New"
                  checked={condition === "Brand New"}
                  onChange={(e) => setCondition(e.target.value)}
                  required
                />
                Brand New
                </label>
                <label>
                  <input
                    type="radio"
                    value="Recycled Goods"
                    checked={condition === "Recycled Goods"}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                  Recycled Goods
                </label>
                <label>
                  <input
                    type="radio"
                    value="Used"
                    checked={condition === "Used"}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                  Used
                </label>
              </div>
            </div>
          </div>
          <div className="col-flex">
            <div className="input-group">
              <label>Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Delivery Option</label>
              <input
                type="text"
                placeholder="Delivery option"
                value={deliveryOption}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Location</label>
              <select 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="">Select location</option>
                <option value="Abia">Abia</option>
                <option value="Adamawa">Adamawa</option>
                <option value="Akwa Ibom">Akwa Ibom</option>
                <option value="Anambra">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue">Benue</option>
                <option value="Borno">Borno</option>
                <option value="Cross River">Cross River</option>
                <option value="Delta">Delta</option>
                <option value="Ebonyi">Ebonyi</option>
                <option value="Edo">Edo</option>
                <option value="Ekiti">Ekiti</option>
                <option value="Enugu">Enugu</option>
                <option value="Gombe">Gombe</option>
                <option value="Imo">Imo</option>
                <option value="Jigawa">Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value="Kebbi">Kebbi</option>
                <option value="Kogi">Kogi</option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa">Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value="Osun">Osun</option>
                <option value="Oyo">Oyo</option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers">Rivers</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Taraba">Taraba</option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>
                <option value="FCT">FCT</option>
              </select>
          </div>
          </div>
          <button 
            type="submit" 
            className="publish-btn"
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish Listing"}
          </button>
        </form>
      </section>

      <VerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default SellerProfile;