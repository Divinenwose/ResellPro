import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import "./Header.css";
import { faBell, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/Logo.png";
import axios from "axios";
import { toast } from "react-toastify";

const apiURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const Header = ({tab, setTab}) => {
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    let windowWidth = window.innerWidth;
    
    const handleLogout = async (e) => {
        try {
            const url = "/api/auth/logout";
            const payload = {
                token: localStorage.getItem("adminToken"),
            };

            const response = await axios.post(`${apiURL}${url}`, payload, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("adminToken")}` },
            });
            localStorage.removeItem("adminToken");
            toast.success("Logout successful!");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    return (
        <div className="content-header">
            <div className="content-header-left">
                {windowWidth > 768 ? (
                    <div className="content-header-left-search">
                        <input type="text" placeholder="Search" />
                    </div>
                ) : (
                    <div className="content-header-left-search-container">
                        <div className="logo-container">
                            <Link to="/">
                            <img className="nav-logo" src={Logo} alt="Logo" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div className="content-header-control">
                <a className="dropdownToggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <FontAwesomeIcon icon={faBell} className="bell-icon" />
                    <span>Admin Panel</span>
                    {isDropdownOpen ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                    )}
                </a>

                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            {
                                windowWidth <= 768 && (
                                    <>
                                    <li>
                                        <a href="#" onClick={() => setTab("main")}>
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={() => setTab("user")}>
                                        User management
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={() => setTab("transactions")}>
                                            Transactions
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={() => setTab("product-categories")}>
                                            Product Categories
                                        </a>
                                    </li>
                                    </>
                                )
                            }
                            <li><a href="#">Profile</a></li>
                            <li style={{cursor: "pointer"}} onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}

                
            </div>
        </div>
    );
};

export default Header;
