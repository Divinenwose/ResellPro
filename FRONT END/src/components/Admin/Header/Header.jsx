import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import "./Header.css";
import { faBell, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Logo from '../../../assets/Logo.png';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    let windowWidth = window.innerWidth;
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
                                        <a href="#">
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                        User management
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Transactions
                                        </a>
                                    </li>
                                    </>
                                )
                            }
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul>
                    </div>
                )}

                
            </div>
        </div>
    );
};

export default Header;
