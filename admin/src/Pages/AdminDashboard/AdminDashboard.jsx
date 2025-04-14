import React, { useState } from "react";
import "./AdminDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import MainDashboard from "../../components/MainDashboard/MainDashboard";
import UserManagement from "../../components/UserManagement/UserManagement";
import Transactions from "../../components/Transactions/Transactions";

const AdminDashboard = () => {
    const [selectedTab, setSelectedTab] = useState("main");
    let windowWidth = window.innerWidth;
  return (
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative"}}>
        <div className="admin-dashboard-container">

            {windowWidth > 768 && (
                <Sidebar tab={selectedTab} setTab={setSelectedTab}/>
            )}
            <div className="dashboard-content">
                <Header tab={selectedTab} setTab={setSelectedTab}/>

                {windowWidth <= 768 && (
                    <div className="content-header-left-search">
                        <input type="text" placeholder="Search" />
                    </div>
                )}
                
                <div className="dashboard-content-body">
                    {selectedTab === "main" && <MainDashboard />}
                    {selectedTab === "user" && <UserManagement />}
                    {selectedTab === "transactions" && <Transactions />}
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
