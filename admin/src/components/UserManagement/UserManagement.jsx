import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                    }
                });
                setUsers(response.data.data);
            } catch (error) {
                setError(error);
                
            }
        };
        fetchUsers();
    }, []);

    const disputeCases = [
      { name: 'Oparah Helen', content: 'The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath.....'},
      { name: 'Oparah Helen', content: 'The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath.....'},
      { name: 'Oparah Helen', content: 'The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath.....'},
      { name: 'Oparah Helen', content: 'The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath.....'},
      { name: 'Oparah Helen', content: 'The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath The Case id: IRB#037 for patient Aaron-James of ge... from Irregular heartbeat and Shortness of breath.....'},
    ]
    return (
      <div className="user-management-container">
        <div className="user-management-header">  
          <h3>User Management</h3>
        </div>
        <div className="table-container">
          { users.length > 0 ?
            <table className="table">
              <thead>
                <tr>
                  <th>Users</th>
                  <th>Email</th>
                  <th>Role</th>
                  {/* <th>Status</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.roles.includes("seller") ? "Seller" : user.roles.includes("admin") ? "Admin" : "Buyer"}</td>
                    {/* <td>
                      <select name="" id="">
                        <option value="Offline" selected={user.status === "Offline"}>Offline</option>
                        <option value="Active" selected={user.status === "Active"}>Active</option>
                        <option value="Suspended" selected={user.status === "Suspended"}>Suspended</option>
                      </select>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            :
            <div className="no-users-container" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", padding: "2rem"}}>
              <p>No users found</p>
            </div>
          }
        </div>
  
        <div className="case-dispute-container">
          <h3 style={{marginBottom: '1rem'}}>Case Dispute</h3>
          {disputeCases.map((disputeCase, idx) => (
            <div className="case-description" key={idx}>
              <p className="bold-text">{disputeCase.name}</p>
              <div className="case-description-content">
              <p className="text">
                {disputeCase.content} <a href="#" className="see-more">See more</a>
              </p>
              <div className="resolve-case-btn">
                <button>Resolve Case</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default UserManagement;
