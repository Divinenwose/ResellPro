import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import Hero from "../../components/Hero/Hero";
import ListedProject from "../../components/ListedProject/ListedProject";
import Footer from "../../components/Footer/Footer";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp && decodedToken.exp > currentTime) {
                    localStorage.setItem("token", token);

                    navigate("/", { replace: true });
                    window.location.reload();
                } else {
                    toast.error("Token has expired");
                }
            } catch (error) {
                toast.error("Invalid token");
            }
        }
    }, [navigate]);
    return(
        <div className="Home">
            <Hero />
            <ListedProject />
            <Footer />
        </div>
    )
}

export default HomePage;