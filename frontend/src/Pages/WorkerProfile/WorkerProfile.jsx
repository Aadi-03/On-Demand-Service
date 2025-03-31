import React from "react";
import NewTradesmanNavbar from "../../Components/NewNavbar/NewTradesmanNavbar";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { 
  FaUser, 
  FaRegEdit, 
  FaPhone, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaTools, 
  FaSave, 
  FaTimes, 
  FaVenusMars, 
  FaBriefcase,
  FaStar
} from "react-icons/fa";

import "./WorkerProfile.css";

const WorkerProfile = () => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function makeRequest() {
      setLoading(true);
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:5000/provider/auth/profile",
        headers: {
          Authorization: `bearer ${localStorage.getItem("providerToken")}`,
        },
      };
      try {
        let response = await axios.request(config);
        setUserData(response.data);
        setFormData(response.data);
        let cnt=0;
        response.data.orders.forEach((task) => {
          if (task.state === "COMPLETED") {
            cnt++;
          }
        });
        setFormData((prev) => ({
          ...prev,
          completedJobs: cnt,
        }));
      } catch (err) {
        console.log(err);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }

    makeRequest();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "houseNumber" || name === "streetName" || name === "state" || name === "pincode") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleEdit() {
    setEdit(true);
  }

  function handleCancel() {
    setEdit(false);
    setFormData(userData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formattedDob = formData.dob;
  if (formData.dob && typeof formData.dob === 'string') {
    // Ensure we're sending a properly formatted ISO string
    formattedDob = new Date(formData.dob).toISOString();
  }
  
  const updatedData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    dob: formattedDob,
    phoneNumber: formData.phoneNumber,
    address: formData.address,
    gender: formData.gender,
    workType: formData.workType,
  };
    console.log(updatedData);
    
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/provider/auth/updateProfile",
      headers: {
        Authorization: "bearer " + localStorage.getItem("providerToken"),
        "Content-Type": "application/json",
      },
      data: updatedData,
    };

    try {
      const response = await axios.request(config);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Profile updated successfully");
        setEdit(false);
        setUserData({...formData});
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <>
        <NewTradesmanNavbar />
        <div className="profile-container">
          <div className="loading-spinner">Loading profile data...</div>
        </div>
      </>
    );
  }

  // Calculate years of experience (placeholder)
  const experience = formData.experience || "5 years";
  const jobsCompleted = formData.completedJobs || 48;

  return (
    <>
      <ToastContainer position="bottom-right" />
      <NewTradesmanNavbar />
      <div className="worker-profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <h1>My Professional Profile</h1>
            {!edit && (
              <button className="edit-profile-btn" onClick={handleEdit}>
                <FaRegEdit /> Edit Profile
              </button>
            )}
          </div>

          <div className="profile-layout">
            <div className="profile-sidebar">
              <div className="profile-card">
                <div className="profile-image-wrapper">
                  <img
                    src="https://randomuser.me/api/portraits/men/43.jpg" 
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
                <h2 className="profile-name">
                  {formData.firstName} {formData.lastName}
                </h2>
                <div className="profile-occupation">
                  <FaTools /> {formData.workType || "Professional"}
                </div>
                
                <div className="profile-badge">
                  <FaStar style={{ marginRight: '5px' }} /> 
                  {formData.rating ? parseFloat(formData.rating).toFixed(2) : "4.80"} Rating
                </div>
                
                <div className="profile-stats">
                  <div className="stat-item">
                    <div className="stat-value">{experience}</div>
                    <div className="stat-label">Experience</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{jobsCompleted}</div>
                    <div className="stat-label">Jobs</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-content">
              <form onSubmit={handleSubmit} className="form-container">
                <div className="form-section">
                  <h3 className="form-section-title">
                    <FaUser /> Personal Information
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={`form-control ${edit ? 'editable' : ''}`}
                        value={formData.firstName || ""}
                        onChange={handleChange}
                        readOnly={!edit}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={`form-control ${edit ? 'editable' : ''}`}
                        value={formData.lastName || ""}
                        onChange={handleChange}
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="dob">
                        <FaCalendarAlt style={{ marginRight: '5px' }} /> Date of Birth
                      </label>
                      <input
                        className={`form-control ${edit ? 'editable' : ''}`}
                        type="date"
                        name="dob"
                        value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ""}
                        placeholder="YYYY-MM-DD"
                        required
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        onChange={handleChange}
                        readOnly={!edit}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="gender">
                        <FaVenusMars style={{ marginRight: '5px' }} /> Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className={`form-control ${edit ? 'editable' : ''}`}
                        value={formData.gender || ""}
                        onChange={handleChange}
                        disabled={!edit}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">
                    <FaPhone /> Contact Details
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className={`form-control ${edit ? 'editable' : ''}`}
                        value={formData.phoneNumber || ""}
                        onChange={handleChange}
                        readOnly={!edit}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email || ""}
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">
                    <FaMapMarkerAlt /> Address Information
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="houseNumber">House Number</label>
                      <input
                        type="text"
                        id="houseNumber"
                        name="houseNumber"
                        className={`form-control ${edit ? 'editable' : ''}`}
                        value={formData?.address?.houseNumber || ""}
                        onChange={handleChange}
                        readOnly={!edit}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="streetName">Street Name</label>
                      <input
                        type="text"
                        id="streetName"
                        name="streetName"
                        className={`form-control ${edit ? 'editable' : ''}`}
                        value={formData?.address?.streetName || ""}
                        onChange={handleChange}
                        readOnly={!edit}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <select
                        id="state"
                        name="state"
                        className={`form-control ${edit ? 'editable' : ''}`}
                        value={formData?.address?.state || ""}
                        onChange={handleChange}
                        disabled={!edit}
                      >
                        <option value="">Select state</option>
                 <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                 <option value="Andhra Pradesh">Andhra Pradesh</option>
                 <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                 <option value="Assam">Assam</option>
                 <option value="Bihar">Bihar</option>
                 <option value="Chandigarh">Chandigarh</option>
                 <option value="Chhattisgarh">Chhattisgarh</option>
                 <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                 <option value="Daman and Diu">Daman and Diu</option>
                 <option value="Delhi">Delhi</option>
                 <option value="Goa">Goa</option>
                 <option value="Gujarat">Gujarat</option>
                 <option value="Haryana">Haryana</option>
                 <option value="Himachal Pradesh">Himachal Pradesh</option>
                 <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                 <option value="Jharkhand">Jharkhand</option>
                 <option value="Karnataka">Karnataka</option>
                 <option value="Kerala">Kerala</option>
                 <option value="Ladakh">Ladakh</option>
                 <option value="Lakshadweep">Lakshadweep</option>
                 <option value="Madhya Pradesh">Madhya Pradesh</option>
                 <option value="Maharashtra">Maharashtra</option>
                 <option value="Manipur">Manipur</option>
                 <option value="Meghalaya">Meghalaya</option>
                 <option value="Mizoram">Mizoram</option>
                 <option value="Nagaland">Nagaland</option>
                 <option value="Odisha">Odisha</option>
                 <option value="Puducherry">Puducherry</option>
                 <option value="Punjab">Punjab</option>
                 <option value="Rajasthan">Rajasthan</option>
                 <option value="Sikkim">Sikkim</option>
                 <option value="Tamil Nadu">Tamil Nadu</option>
                 <option value="Telangana">Telangana</option>
                 <option value="Tripura">Tripura</option>
                 <option value="Uttar Pradesh">Uttar Pradesh</option>
                 <option value="Uttarakhand">Uttarakhand</option>
                 <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="pincode">PIN Code</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        className={`form-control ${edit ? 'editable' : ''}`}
                        value={formData?.address?.pincode || ""}
                        onChange={handleChange}
                        readOnly={!edit}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        className="form-control"
                        value="India"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">
                    <FaBriefcase /> Professional Information
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="workType">Specialization</label>
                      <select
                        id="workType"
                        name="workType"
                        className={`form-control ${edit ? 'editable' : ''}`}
                        value={formData.workType || ""}
                        onChange={handleChange}
                        disabled={!edit}
                      >
                        <option value="">Select Specialization</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Mechanic">Mechanic</option>
                        <option value="Electrician">Electrician</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="aadharNumber">Aadhar Card Number</label>
                      <input
                        type="text"
                        id="aadharNumber"
                        name="aadharNumber"
                        className="form-control"
                        value={formData.aadharNumber ? 
                          formData.aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX XXXX $3") : 
                          ""}
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>

                {edit && (
                  <div className="button-container">
                    <button type="submit" className="btn btn-primary">
                      <FaSave /> Save Changes
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-danger" 
                      onClick={handleCancel}
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerProfile;
