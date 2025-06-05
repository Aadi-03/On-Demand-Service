import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

function AdminPage() {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorProviders, setErrorProviders] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (selectedSection === "users") {
        setLoadingUsers(true);
        setErrorUsers(null);
        try {
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://localhost:5000/customer/auth/bulkcustomer",
            headers: {
              Authorization: `bearer ${localStorage.getItem("customerToken")}`,
            },
          };
          const response = await axios.request(config);
          console.log(response?.data?.customers);
          if (response.status !== 200) {
            throw new Error("Failed to fetch users");
          }
          setUsers(response?.data?.customers);
        } catch (error) {
          setErrorUsers("Failed to fetch users: " + error.message);
        } finally {
          setLoadingUsers(false);
        }
      }
    };

    const fetchProviders = async () => {
      if (selectedSection === "providers") {
        setLoadingProviders(true);
        setErrorProviders(null);
        try {
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://localhost:5000/customer/auth/bulkprovider",
            headers: {
              Authorization: `bearer ${localStorage.getItem("customerToken")}`,
            },
          };
          const response = await axios.request(config);
          if (response.status !== 200) {
            throw new Error("Failed to fetch providers");
          }
          setProviders(response?.data?.provider);
        } catch (error) {
          setErrorProviders("Failed to fetch providers: " + error.message);
        } finally {
          setLoadingProviders(false);
        }
      }
    };

    fetchUsers();
    fetchProviders();
  }, [selectedSection]);

  // Delete user function
  const handleDeleteUser = async (customerId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    setDeleteLoading(`user-${customerId}`);
    try {
      const token = localStorage.getItem("customerToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.delete(
        `http://localhost:5000/customer/auth/deletecustomer/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Changed from 'bearer' to 'Bearer'
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.status === 200) {
        // Remove user from local state
        setUsers(prevUsers => prevUsers.filter(user => user.customerId !== customerId));
        alert("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.error || error.response.data?.message || 'Server error';
        alert(`Error deleting user: ${errorMessage}`);
      } else if (error.request) {
        // Request was made but no response received
        alert("Network error: Unable to connect to server");
      } else {
        // Something else happened
        alert(`Error: ${error.message}`);
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  // Delete provider function
  const handleDeleteProvider = async (providerId) => {
    if (!window.confirm("Are you sure you want to delete this provider? This action cannot be undone.")) {
      return;
    }

    setDeleteLoading(`provider-${providerId}`);
    try {
      const token = localStorage.getItem("customerToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.delete(
        `http://localhost:5000/provider/auth/deleteprovider/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Changed from 'bearer' to 'Bearer'
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.status === 200) {
        // Remove provider from local state
        setProviders(prevProviders => prevProviders.filter(provider => provider.providerId !== providerId));
        alert("Provider deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting provider:", error);
      
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.error || error.response.data?.message || 'Server error';
        alert(`Error deleting provider: ${errorMessage}`);
      } else if (error.request) {
        // Request was made but no response received
        alert("Network error: Unable to connect to server");
      } else {
        // Something else happened
        alert(`Error: ${error.message}`);
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  const renderUsersTable = () => {
    if (loadingUsers) return <div>Loading users...</div>;
    if (errorUsers) return <div className="error">{errorUsers}</div>;
    if (!users || users.length === 0) return <div>No users found.</div>;
    
    return (
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Join Date</th>
              <th>Total Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.customerId}>
                <td data-label="ID">#{user.customerId}</td>
                <td data-label="Name">{user?.customerName || user.fullName || user.username}</td>
                <td data-label="Email">{user.customerEmail}</td>
                <td data-label="Phone">{user.customerPhone || user.mobile}</td>
                <td data-label="Address">{user.customerAddress || 'Address not available'}</td>
                <td data-label="Join Date">
                  {user.customerCreatedAt ? new Date(user.customerCreatedAt).toLocaleDateString() : 'N/A'}
                </td>
                <td data-label="Total Orders">
                  <span className="badge badge-info">{user.totalOrders || 0}</span>
                </td>
                <td data-label="Actions">
                  <div className="action-buttons">
                    <button 
                      className="btn-view" 
                      title="View Details"
                      onClick={() => alert('View functionality to be implemented')}
                    >
                      👁️
                    </button>
                    <button 
                      className="btn-edit" 
                      title="Edit User"
                      onClick={() => alert('Edit functionality to be implemented')}
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-delete" 
                      title="Delete User"
                      onClick={() => handleDeleteUser(user.customerId)}
                      disabled={deleteLoading === `user-${user.customerId}`}
                    >
                      {deleteLoading === `user-${user.customerId}` ? '⏳' : '🗑️'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderProvidersTable = () => {
    if (loadingProviders) return <div>Loading providers...</div>;
    if (errorProviders) return <div className="error">{errorProviders}</div>;
    if (!providers || providers.length === 0) return <div>No providers found.</div>;
    
    return (
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Address</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.providerId}>
                <td data-label="ID">#{provider.providerId}</td>
                <td data-label="Name">{provider.providerName || provider.providerfullName || provider.providerusername}</td>
                <td data-label="Email">{provider.providerEmail}</td>
                <td data-label="Phone">{provider.providerPhone || provider.mobile}</td>
                <td data-label="Service">
                  <span className="service-badge">{provider.providerWorkType || provider.service}</span>
                </td>
                <td data-label="Address">{provider.providerAddress || 'Address not available'}</td>
                <td data-label="Rating">
                  <div className="rating">
                    <span>★</span> {provider.providerRating ? provider.providerRating.toFixed(1) : 'N/A'}
                  </div>
                </td>
                <td data-label="Status">
                  <span className={`status ${provider.providerStatus ? 'active' : 'inactive'}`}>
                    {provider.providerStatus ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="action-buttons">
                    <button 
                      className="btn-view" 
                      title="View Details"
                      onClick={() => alert('View functionality to be implemented')}
                    >
                      👁️
                    </button>
                    <button 
                      className="btn-edit" 
                      title="Edit Provider"
                      onClick={() => alert('Edit functionality to be implemented')}
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-delete" 
                      title="Delete Provider"
                      onClick={() => handleDeleteProvider(provider.providerId)}
                      disabled={deleteLoading === `provider-${provider.providerId}`}
                    >
                      {deleteLoading === `provider-${provider.providerId}` ? '⏳' : '🗑️'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "dashboard":
        return (
          <div className="section-content">
            <div className="dashboard-overview">
              <h2>📊 Admin Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p className="stat-number">{users.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Providers</h3>
                  <p className="stat-number">{providers.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Active Providers</h3>
                  <p className="stat-number">
                    {providers.filter(p => p.providerStatus).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Registered Users</h2>
              <p className="section-description">Manage all registered customers</p>
            </div>
            {renderUsersTable()}
          </div>
        );
      case "providers":
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Service Providers</h2>
              <p className="section-description">Manage all service providers</p>
            </div>
            {renderProvidersTable()}
          </div>
        );
      case "bookings":
        return <div className="section-content">📅 Monitoring all bookings</div>;
      case "reports":
        return <div className="section-content">📄 Viewing system reports and logs</div>;
      default:
        return <div className="section-content">Select a section</div>;
    }
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li 
            className={selectedSection === "dashboard" ? "active" : ""}
            onClick={() => setSelectedSection("dashboard")}
          >
            📊 Dashboard
          </li>
          <li 
            className={selectedSection === "users" ? "active" : ""}
            onClick={() => setSelectedSection("users")}
          >
            👥 Users ({users.length})
          </li>
          <li 
            className={selectedSection === "providers" ? "active" : ""}
            onClick={() => setSelectedSection("providers")}
          >
            🔧 Service Providers ({providers.length})
          </li>
          <li 
            className={selectedSection === "bookings" ? "active" : ""}
            onClick={() => setSelectedSection("bookings")}
          >
            📅 Bookings
          </li>
          <li 
            className={selectedSection === "reports" ? "active" : ""}
            onClick={() => setSelectedSection("reports")}
          >
            📄 Reports
          </li>
        </ul>
      </div>
      <div className="main-content">
        <header>
          <h1>{selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}</h1>
        </header>
        <div className="content-area">{renderSection()}</div>
      </div>
    </div>
  );
}

export default AdminPage;