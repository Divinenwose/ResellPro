import React, { useEffect, useState } from "react";
import "./Login.css";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../App";


const apiURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const Login = () => {
    const { setAuth, auth } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if(token){
            navigate("/dashboard");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const userType = "admin";
          const url = "/api/auth/admin-login";
          const payload = { email: formData.email, password: formData.password, role: userType }; 
    
          const response = await axios.post(`${apiURL}${url}`, payload, {
            headers: { "Content-Type": "application/json" },
          });

            toast.success("User login successful!");
            localStorage.setItem("adminToken", response.data.data.token);
            const storedToken = localStorage.getItem("adminToken");
            const decodedToken = jwtDecode(storedToken);
            let isAdmin = false;
            if(decodedToken.roles.includes("admin")){
              isAdmin = true;
            }
            setAuth({ token: storedToken, isAuthenticated: true, isAdmin, name: decodedToken.name });
            navigate("/dashboard");
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
          localStorage.removeItem("adminToken");
          setAuth({ token: null, isAuthenticated: false, isSeller: false, isBuyer: false, isAdmin: false, name: null });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="admin-login-container">
            <div className="admin-login-header">
                <img src={Logo} alt="Logo" className="platform-logo" />
            </div>
            <div className="admin-login-card">
                <h2>Admin Login</h2>
                <p>Please enter your credentials to continue</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email Address" name="email" onChange={handleChange} required />
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
                    <button type="submit">Login</button>
                </form>
                {/* <a href="/forgot-password" className="forgot-link">Forgot Password?</a> */}
            </div>
        </div>
    );
};

export default Login;