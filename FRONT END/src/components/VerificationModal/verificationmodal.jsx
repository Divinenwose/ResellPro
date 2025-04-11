import React from "react";
import "./verificationmodal.css";

const VerificationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Verification Form</h2>
        <p>Become a Verified Seller</p>
        <form>
          <label>Business Name</label>
          <input type="text" placeholder="Enter business name" />

          <label>Email</label>
          <input type="email" placeholder="Enter email" />

          <label>Phone Number</label>
          <input type="text" placeholder="Enter phone number" />

          <label>Nature of Business</label>
          <input type="text" placeholder="Enter business nature" />

          <label>ID Card</label>
          <p className="subtext">Submit an acceptable ID card for registration</p>
          <div className="id-upload">
            <span>+</span>
            <p>Add a clear photo of ID Card</p>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default VerificationModal;
