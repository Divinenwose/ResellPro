import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faMoneyBill, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import Logo from '../../../assets/Logo.png';
import Avatar from '../../../assets/adminAvatar.png';


const Sidebar = () => {
    const windowWidth = window.innerWidth;
    const sidebarItems = [
        {
            icon: faHome,
            text: "Dashboard",
            link: "/admin-dashboard"
        },
        {
            icon: faUser,
            text: "User management",
            link: "/admin-dashboard/user-management"
        },
        {
            icon: faMoneyBill,
            text: "Transactions",
            link: "/admin-dashboard/transactions"
        }
    ]
    return (
        <div className="dashboard-sidebar">
            {windowWidth > 768 && (
                <>
                    <div className="logo-container">
                        <Link to="/">
                        <img className="nav-logo" src={Logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="dashboard-name-section">
                        <div className="dashboard-name-section-avatar">
                            <img src={Avatar} alt="Avatar" />
                        </div>
                        <div className="dashboard-name-section-text">
                            <p className="dashboard-name-section-text-name">Favour Osaro</p>
                            <p className="dashboard-name-section-text-role">Admin Panel</p>
                        </div>
                    </div>
                </>
            )}
            <div className="dashboard-sidebar-items">
                <ul>
                    {sidebarItems.map((item, index) => (
                        <li key={index} className={` ${index === 0 ? 'active' : ''}`}>
                            <Link to={item.link} className={`dashboard-sidebar-item `}>
                                <FontAwesomeIcon icon={item.icon} />
                                <p>{item.text}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;

