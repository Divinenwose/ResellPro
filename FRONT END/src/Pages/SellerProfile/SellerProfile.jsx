import React, { useEffect, useState } from "react";
import { useAuth } from "../../App";
import axios from "axios";
const SellerProfile = () => {
    const { auth } = useAuth();
    const [businessName, setBusinessName] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        const fetchSellerProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/seller/profile-details", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setBusinessName(response.data.data.businessName);
                setDescription(response.data.data.description);
                setPhone(response.data.data.phone);
                setEmail(response.data.data.email);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSellerProfile();
    }, []);
    return (
        <div>
            <h1>Welcome to your profile, {businessName}</h1>
        </div>
    );
};

export default SellerProfile;
