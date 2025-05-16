import React from "react";
import "./MainDashBoard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFile, faDollarSign, faCheckSquare, faTimesSquare, faNairaSign } from "@fortawesome/free-solid-svg-icons";
import kettle from "../../assets/kettle.jpeg";
import DonutChart from "../../components/DonutChart/DonutChart";
import GradientAreaChart from "../../components/GradientAreaChart/GradientAreaChart";

const MainDashboard = () => {
    const data = [
        {name: "Electric Jug", date: "05/03/25", category: "Electronics", status: "Pending", image: kettle},
        {name: "Electric Jug", date: "05/03/25", category: "Electronics", status: "Pending", image: kettle},
        {name: "Electric Jug", date: "05/03/25", category: "Electronics", status: "Pending", image: kettle},
        {name: "Electric Jug", date: "05/03/25", category: "Electronics", status: "Pending", image: kettle},
        {name: "Electric Jug", date: "05/03/25", category: "Electronics", status: "Pending", image: kettle},
        {name: "Electric Jug", date: "05/03/25", category: "Electronics", status: "Pending", image: kettle},
        {name: "Electric Jug", date: "05/03/25", category: "Electronics", status: "Pending", image: kettle},
        {name: "Electric Jug", date: "05/03/25", category: "Electronics", status: "Pending", image: kettle},  
    ];
    return (
        <div className="main-dashboard-container">
            <div className="main-dashboard-header">
                <h3>Key Stats</h3>
            </div>
            <div className="stats-cards">
                <div className="stats-card">
                    <div className="stats-card-icon">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <h4>Total New Users</h4>
                    <p>150k</p>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon">
                        <FontAwesomeIcon icon={faFile} />
                    </div>
                    <h4>Dispute Cases</h4>
                    <p>105</p>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon">
                        <FontAwesomeIcon icon={faNairaSign} />
                    </div>
                    <h4>Total Sales</h4>
                    <p>250k</p>
                </div>
            </div>
            <div className="main-dashboard-content">
                <div className="content-table">
                    <table className="content-table-table">
                        <tbody> 
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td style={{width: "250px"}}>
                                        <div className="content-table-name">
                                            <div className="content-table-name-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="content-table-name-text">
                                                {item.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{width: "250px"}}>{item.date}</td>
                                    <td style={{width: "250px"}}>{item.category}</td>
                                    <td style={{width: "50px"}}>
                                        <div className="content-table-status" style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                                            <FontAwesomeIcon icon={faCheckSquare} style={{color: "green"}}/>
                                            <FontAwesomeIcon icon={faTimesSquare} style={{color: "red"}}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className="content-chart">
                    <div className="content-chart-header">
                        <h3>Analysis</h3>
                        <div className="content-chart-donut">
                            <DonutChart />
                        </div>
                        <div className="content-chart-area">
                            <GradientAreaChart />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default MainDashboard;

