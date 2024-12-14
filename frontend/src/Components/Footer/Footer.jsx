import React from "react";
import logo from "../../assets/LandingPageImages/Company-Logo.png";
import facebook from "../../assets/LandingPageImages/facebook.png";
import instagram from "../../assets/LandingPageImages/instagram.png";
import twitter from "../../assets/LandingPageImages/twitter.png";
import linkedin from "../../assets/LandingPageImages/linkedin.png";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="image-container">
        <img src={logo} alt="Company Logo" />
      </div>
      <div className="content">
        <div className="container">
          <h1>Company</h1>
          <p>About Us</p>
          <p>Terms & Condition</p>
          <p>Privacy Policy</p>
        </div>
        <div className="container">
          <h1>For Customer</h1>
          <p>Contact Us</p>
          <p>On Demad Service Reviews</p>
        </div>
        <div className="container">
          <h1>For Professionals</h1>
          <p>Register as a Professional</p>
        </div>
        <div className="container">
          <h1>Social Links</h1>
          <div className="links">
            <a href=""><img src={twitter} alt="" /></a>
            <a href=""><img src={instagram} alt="" /></a>
            <a href=""><img src={facebook} alt="" /></a>
            <a href=""><img src={linkedin} alt="" /></a>
          </div>
        </div>
      </div>
      <div className="copyright">
        Copyright © 2024 All Rights Reserved
      </div>
      
    </footer>
  );
};

export default Footer;
