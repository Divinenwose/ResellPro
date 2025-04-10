import React, { useState } from "react";
import "./AdminDashboard.css";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Header from "../../components/Admin/Header/Header";
import MainDashboard from "../../components/Admin/MainDashboard/MainDashboard";
import UserManagement from "../../components/Admin/UserManagement/UserManagement";
import Transactions from "../../components/Admin/Transactions/Transactions";
const AdminDashboard = () => {
    let windowWidth = window.innerWidth;
  return (
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative"}}>
        <div className="admin-dashboard-container">

            {windowWidth > 768 && (
                <Sidebar />
            )}
            <div className="dashboard-content">
                <Header />

                {windowWidth <= 768 && (
                    <div className="content-header-left-search">
                        <input type="text" placeholder="Search" />
                    </div>
                )}
                
                <div className="dashboard-content-body">
                    {/* <MainDashboard /> */}
                    {/* <UserManagement /> */}
                    <Transactions />
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default AdminDashboard;
