import React from "react";
import { Link } from "react-router-dom";
import "./403.css";

const Page403 = () => {
  return (
    <div className="page-403">
      <h1>403</h1>
      <p>You are not authorized to access this page</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Page403;
