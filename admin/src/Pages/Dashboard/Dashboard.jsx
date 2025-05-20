import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import MainDashboard from "../../components/MainDashboard/MainDashboard";
import UserManagement from "../../components/UserManagement/UserManagement";
import Transactions from "../../components/Transactions/Transactions";
import { useAuth } from "../../App";
import ProductCategories from "../../components/Category/ProductCategories";
const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState("main");
    const [rerender, setRerender] = useState(false);
    let windowWidth = window.innerWidth;

    const apiURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
    const [stats, setStats] = useState([]);
    const [allStats, setAllStats] = useState([]);


    useEffect(() => {
        const fetchStats = async () => {
            const response = await fetch(apiURL + "/api/admin/stats", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                }
            });
            const data = await response.json();
            setStats(data.data);
        };
        fetchStats();
    }, []);

    
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
                    {selectedTab === "main" && <MainDashboard stats={stats} />}
                    {selectedTab === "user" && <UserManagement stats={stats}/>}
                    {selectedTab === "transactions" && <Transactions stats={stats}/>}
                    {selectedTab === "product-categories" && <ProductCategories stats={stats}/>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
