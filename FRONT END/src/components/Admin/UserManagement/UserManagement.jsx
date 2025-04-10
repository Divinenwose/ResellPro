import React from 'react';
import './UserManagement.css';

const UserManagement = () => {
    const users = [
        { name: 'Patrick Obiri', email: 'debra.holt@example.com', role: 'Buyer', status: 'Active' },
        { name: 'Jane Cooper', email: 'debra.holt@example.com', role: 'Buyer', status: 'Active' },
        { name: 'Leslie Alexander', email: 'debra.holt@example.com', role: 'Buyer', status: 'Active' },
        { name: 'Esther Howard', email: 'debra.holt@example.com', role: 'Buyer', status: 'Active' },
        { name: 'Jenny Wilson', email: 'debra.holt@example.com', role: 'Buyer', status: 'Offline' },
        { name: 'Leslie Alexander', email: 'debra.holt@example.com', role: 'Seller', status: 'Suspended' },
        { name: 'Guy Hawkins', email: 'debra.holt@example.com', role: 'Seller', status: 'Active' },
        { name: 'Dianne Russell', email: 'debra.holt@example.com', role: 'Seller', status: 'Offline' },
        { name: 'Robert Fox', email: 'debra.holt@example.com', role: 'Seller', status: 'Suspended' },
        { name: 'Patrick Obiri', email: 'debra.holt@example.com', role: 'Buyer', status: 'Offline' },
        { name: 'Jacob Jones', email: 'debra.holt@example.com', role: 'Buyer', status: 'Active' },
        { name: 'Patrick Obiri', email: 'debra.holt@example.com', role: 'Seller', status: 'Suspended' },
        { name: 'Ronald Richards', email: 'debra.holt@example.com', role: 'Buyer', status: 'Active' },
        { name: 'Bessie Cooper', email: 'debra.holt@example.com', role: 'Buyer', status: 'Offline' },
        { name: 'Jane Cooper', email: 'debra.holt@example.com', role: 'Buyer', status: 'Active' },
        { name: 'Darrell Steward', email: 'debra.holt@example.com', role: 'Seller', status: 'Active' },
        { name: 'Jerome Bell', email: 'debra.holt@example.com', role: 'Seller', status: 'Offline' },
        { name: 'Bessie Cooper', email: 'debra.holt@example.com', role: 'Seller', status: 'Offline' },
    ];

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
          <table className="table">
            <thead>
              <tr>
                <th>Users</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <select name="" id="">
                      <option value="Offline" selected={user.status === "Offline"}>Offline</option>
                      <option value="Active" selected={user.status === "Active"}>Active</option>
                      <option value="Suspended" selected={user.status === "Suspended"}>Suspended</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
