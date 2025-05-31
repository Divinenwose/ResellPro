import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductDetail.css";
import image1 from "../../assets/item0.png"; 
import Searchbar from "../../components/Searchbar/Searchbar";
import details from "../../assets/Details.png";


const similarProducts = [
  { id: 2, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image1 },
  { id: 3, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image1 },
  { id: 4, title: "6L Oraimo Airfryer", price: "₦ 65,000", image: image1 },
];

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-image-section">
        <Searchbar />
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-thumbnails">
          <img src={product.image} alt="Thumbnail 1" className="thumbnail" />
          <img src={product.image} alt="Thumbnail 2" className="thumbnail" />
          <img src={product.image} alt="Thumbnail 3" className="thumbnail" />
        </div>
      </div>

      <div className="product-info-section">
        <div className="product-title-container">
          <h2 className="product-title">{product.title}</h2>
          <img src={details} alt=""  className="product-info-section-img"/>
          <p className="product-price">{product.price}</p>
          <div className="product-meta">
            <p><strong>Status:</strong> {product.status}</p>
            <p><strong>Location:</strong> {product.state}</p>
          </div>
        </div>
        <div className="seller-info">
          <h3>Seller Information</h3>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Contact:</strong> 08012345678</p>
          <p><strong>Rating:</strong> ⭐⭐⭐⭐☆ (4.5/5)</p>
          <div className="seller-info-btn">
            <button className="contact-seller-btn">Contact Seller</button>
            <button className="make-offer-btn">Make an Offer</button>
          </div>
        </div>
      </div>
      <div className="similar-products">
        <h3>Similar Products</h3>
        <div className="similar-products-grid">
          {similarProducts.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} state={{ product: item }} className="similar-product-card">
              <img src={item.image} alt={item.title} className="similar-product-image" />
              <h4>{item.title}</h4>
              <p>{item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
