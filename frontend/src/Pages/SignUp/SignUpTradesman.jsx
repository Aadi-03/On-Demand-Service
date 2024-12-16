import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpTradesman.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import axios from 'axios';
const SignUpTradesman = () => {
  const naviagate = useNavigate();
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
            latitude: position.coords.latitude
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
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let data = JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      houseNumber: formData.houseNumber,
      streetName: formData.streetName,
      state: formData.state,
      pincode: formData.pincode,
      country: formData.country,
      photoLink: formData.photoLink,
      longitude: formData.longitude,
      latitude: formData.latitude,
      workType: formData.workType,
      gender: formData.gender,
      password: formData.password,
      aadharNumber: formData.aadharNumber
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/provider/signup',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        if (response.data.error) {
          alert(response.data.error);
        }
        else{
          alert("Provider signed up successfully");
          localStorage.setItem('tradesmanToken', JSON.stringify(response.data.token));
          naviagate('/provider/dashboard');
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    
    makeRequest();
  };

  return (
    <>
      <Navbar />
      <div className="signup-tradesman-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="name-wrapper">
            <label>First Name: </label>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
            <label>Last Name: </label>
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
          </div>
          <div className="dob-wrapper">
            <label>Date Of Birth: </label>
            <input type="date" name="dob" placeholder="YYYY-MM-DD" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" onChange={handleChange} />
          </div>
          <div className="phonenumber-wrapper">
            <label>Mobile No.: </label>
            <input type="text" name="phoneNumber" placeholder="mobile no." onChange={handleChange} />
          </div>
          <div className="email-wrapper">
            <label>Email: </label>
            <input type="text" name="email" placeholder="email" onChange={handleChange} />
          </div>
          <div className="address-wrapper">
            <label>House Number: </label>
            <input type="text" name="houseNumber" placeholder="House number" onChange={handleChange} />
            <label>Street Name: </label>
            <input type="text" name="streetName" placeholder="Street name" onChange={handleChange} />
            <label>State: </label>
            <select name="state" onChange={handleChange}>
              <option value="">Select state</option>
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
            <label>PinCode : </label>
            <input type="text" name="pincode" onChange={handleChange} />
            <label>Country: </label>
            <input type="text" name="country" value="India" readOnly />
          </div>
          {/* <div className="photo-wrapper">
            <label>Photograph: </label>
            <input type="file" name="photograph" accept="image/*" onChange={handleChange} />
          </div> */}
          <div className="gender-wrapper">
            <label>Gender: </label>
            <select name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Prefer not to say</option>
            </select>
          </div>
          <div className="aadhar-wrapper">
            <label>Aadhar No : </label>
            <input type="text" name="aadharNumber" onChange={handleChange} />
          </div>
          <div className="worktype-wrapper">
            <label>Work Type :</label>
            <select name="workType" onChange={handleChange}>
              <option value="WorkType">Select WorkType</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Plumber">Plumber</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Electrician">Electrician</option>
            </select>
          </div>
          <div className="password-wrapper">
            <label>Password: </label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUpTradesman;
