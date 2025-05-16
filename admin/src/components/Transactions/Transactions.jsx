import React from 'react';
import './Transactions.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFile, faNairaSign, faHandshake, faCheckSquare, faTimesSquare } from "@fortawesome/free-solid-svg-icons";
import smilingGirl from "../../assets/smilingGirl.png";
import smilingMan from "../../assets/smilingMan.png";
import DonutChart from "../../components/DonutChart/DonutChart";

const Transactions = () => {
    const transactionHistory = [
        {
            image: smilingGirl,
            content: "Victoria made a payment of 5,000 NGN for necklace of splash collection"
        },
        {
            image: smilingMan,
            content: "Pascal made a payment of 5,000 NGN for necklace of splash collection"
        },
        {
            image: smilingGirl,
            content: "Victoria made a payment of 1,000 NGN for necklace of splash collection"
        },
        {
            image: smilingMan,
            content: "Pascal made a payment of 5,000 NGN for necklace of splash collection"
        },
        {
            image: smilingGirl,
            content: "Pascal made a payment of 5,000 NGN for necklace of splash collection"
        }
    ]
    return (
        <div className="main-dashboard-container">
            <div className="main-dashboard-header">
                <h3>Key Stats</h3>
            </div>
            <div className="stats-cards">
                <div className="stats-card">
                    <div className="stats-card-icon">
                        <FontAwesomeIcon icon={faNairaSign} />
                    </div>
                    <h4>Total Sales</h4>
                    <p>150k</p>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon">
                        <FontAwesomeIcon icon={faHandshake} />
                    </div>
                    <h4>Pending Transactions</h4>
                    <p>105</p>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon">
                        <FontAwesomeIcon icon={faNairaSign} />
                    </div>
                    <h4>Overall Sales</h4>
                    <p>250k</p>
                </div>
            </div>
            <div className="main-dashboard-content">
                <div className="content-chart">
                    <div className="content-chart-header">
                        <div className="content-chart-donut">
                            <DonutChart />
                        </div>
                    </div>
                </div>

                <div className="transaction-history-container">
                    <div className="transaction-history-header">
                        <h3>Transaction History</h3>
                    </div>
                    <div className="transaction-history-content">
                        {transactionHistory.map((transaction, idx) => (
                            <div className="transaction-history" key={idx}>
                                <div className="transaction-history-image">
                                    <img src={transaction.image} alt="Smiling Lady" />
                            </div>
                            <div className="transaction-history-content">
                                    <p>{transaction.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transactions;
