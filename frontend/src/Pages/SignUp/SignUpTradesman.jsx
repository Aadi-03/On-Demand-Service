import "./SignUpTradesman.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NewNavbar from "../../Components/NewNavbar/NewNavbar.jsx";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLock,
  FaVenusMars,
  FaCity,
  FaGlobeAsia,
  FaIdCard,
  FaTools,
  FaHammer,
  FaWrench,
  FaBolt,
  FaCog,
} from "react-icons/fa";

const SignUpTradesman = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    email: "",
    houseNumber: "",
    streetName: "",
    state: "",
    pincode: "",
    country: "India",
    photoLink: null,
    gender: "",
    aadharNumber: "",
    workType: "",
    password: "",
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }));
        },
        (error) => {
          console.error("Error obtaining geolocation", error);
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setWorkType = (type) => {
    setFormData({
      ...formData,
      workType: type,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("hello");
    // console.log(e.target.photoLink.files[0]);
    // console.log("hi");

    // Validate work type is selected
    if (!formData.workType || formData.workType === "WorkType") {
      toast.error("Please select your work type");
      return;
    }

    // Validate Aadhar number
    if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
      toast.error("Please enter a valid 12-digit Aadhar number");
      return;
    }
    let data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("dob", formData.dob);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("email", formData.email);
    data.append("gender", formData.gender);
    data.append("password", formData.password);
    data.append("houseNumber", formData.houseNumber);
    data.append("streetName", formData.streetName);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("pincode", formData.pincode);
    data.append("longitude", formData.longitude);
    data.append("latitude", formData.latitude);
    data.append("aadharNumber", formData.aadharNumber);
    data.append("workType", formData.workType);
    if (e.target.photoLink.files[0]) {
      data.append("photoLink", e.target.photoLink.files[0]);
    }


    // let data = JSON.stringify({
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   dob: formData.dob,
    //   phoneNumber: formData.phoneNumber,
    //   email: formData.email,
    //   houseNumber: formData.houseNumber,
    //   streetName: formData.streetName,
    //   state: formData.state,
    //   pincode: formData.pincode,
    //   country: formData.country,
    //   photoLink: formData.photoLink,
    //   longitude: formData.longitude,
    //   latitude: formData.latitude,
    //   workType: formData.workType,
    //   gender: formData.gender,
    //   password: formData.password,
    //   aadharNumber: formData.aadharNumber,
    // });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/provider/signup",
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        localStorage.setItem("providerToken", response.data.token);
        navigate("/provider/dashboard", {
          state: { success: "You have signed up successfully" },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  // Render the appropriate icon based on work type
  const getWorkTypeIcon = (type) => {
    switch (type) {
      case "Carpenter":
        return <FaHammer />;
      case "Plumber":
        return <FaWrench />;
      case "Electrician":
        return <FaBolt />;
      case "Mechanic":
        return <FaCog />;
      default:
        return <FaTools />;
    }
  };

  return (
    <>
      <NewNavbar />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
      />

      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-header">
            <h1 className="signup-title">Join as a Professional</h1>
            <p className="signup-subtitle">
              Register as a service provider and connect with customers in your
              area who need your expertise.
            </p>
          </div>

          <div className="signup-form-container">
            <form className="signup-tradesman-wrapper" onSubmit={handleSubmit}>
              <h3 className="signup-section-title">Personal Information</h3>

              <div className="form-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <div className="form-field-icon">
                  <FaUser />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <div className="form-field-icon">
                  <FaUser />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="form-field-icon">
                  <FaEnvelope />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="phoneNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your mobile number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <div className="form-field-icon">
                  <FaPhone />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  placeholder="YYYY-MM-DD"
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Prefer not to say</option>
                </select>
                <div className="form-field-icon">
                  <FaVenusMars />
                </div>
              </div>

              <div className="image-upload-container">
                <label htmlFor="photoLink">Profile Image : </label>
                <div className="image-upload">
                  <input
                    type="file"
                    id="photoLink"
                    name="photoLink"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h3 className="signup-section-title">Address Information</h3>

              <div className="form-field">
                <label htmlFor="houseNumber">House Number</label>
                <input
                  type="text"
                  id="houseNumber"
                  name="houseNumber"
                  placeholder="Enter house number"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  required
                />
                <div className="form-field-icon">
                  <FaHome />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="streetName">Street Name</label>
                <input
                  type="text"
                  id="streetName"
                  name="streetName"
                  placeholder="Enter street name"
                  value={formData.streetName}
                  onChange={handleChange}
                  required
                />
                <div className="form-field-icon">
                  <FaMapMarkerAlt />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="pincode">PIN Code</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
                <div className="form-field-icon">
                  <FaMapMarkerAlt />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="AN">Andaman and Nicobar Islands</option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="AR">Arunachal Pradesh</option>
                  <option value="AS">Assam</option>
                  <option value="BR">Bihar</option>
                  <option value="CH">Chandigarh</option>
                  <option value="CT">Chhattisgarh</option>
                  <option value="DN">Dadra and Nagar Haveli</option>
                  <option value="DD">Daman and Diu</option>
                  <option value="DL">Delhi</option>
                  <option value="GA">Goa</option>
                  <option value="GJ">Gujarat</option>
                  <option value="HR">Haryana</option>
                  <option value="HP">Himachal Pradesh</option>
                  <option value="JK">Jammu and Kashmir</option>
                  <option value="JH">Jharkhand</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="LA">Ladakh</option>
                  <option value="LD">Lakshadweep</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MN">Manipur</option>
                  <option value="ML">Meghalaya</option>
                  <option value="MZ">Mizoram</option>
                  <option value="NL">Nagaland</option>
                  <option value="OR">Odisha</option>
                  <option value="PY">Puducherry</option>
                  <option value="PB">Punjab</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="SK">Sikkim</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="TG">Telangana</option>
                  <option value="TR">Tripura</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="UT">Uttarakhand</option>
                  <option value="WB">West Bengal</option>
                </select>
                <div className="form-field-icon">
                  <FaCity />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value="India"
                  readOnly
                  className="readonly-input"
                />
                <div className="form-field-icon">
                  <FaGlobeAsia />
                </div>
              </div>

              <h3 className="signup-section-title">Professional Information</h3>

              <div className="form-field full-width">
                <label htmlFor="aadharNumber">Aadhar Number</label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  placeholder="Enter your 12-digit Aadhar number"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  required
                  maxLength="12"
                  pattern="\d{12}"
                />
                <div className="form-field-icon">
                  <FaIdCard />
                </div>
              </div>

              <div className="form-field full-width">
                <label htmlFor="workType">Work Type</label>
                <select
                  id="workType"
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Your Work Type</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Mechanic">Mechanic</option>
                </select>
                <div className="form-field-icon">
                  <FaTools />
                </div>
              </div>

              <h3 className="signup-section-title">Security</h3>

              <div className="form-field full-width">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="form-field-icon">
                  <FaLock />
                </div>
              </div>

              <div className="submit-button-container">
                <button type="submit" className="submit-button">
                  Register as Professional
                </button>
              </div>
            </form>
          </div>

          <div className="signup-footer">
            <p>
              Already have a professional account?{" "}
              <Link to="/signintradesman">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUpTradesman;
