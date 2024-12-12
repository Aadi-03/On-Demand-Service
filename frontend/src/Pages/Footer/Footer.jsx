import React from "react";
import logo from "../../../public/Company-Logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <img src={logo} alt="" className="logo" />
      <div className="category-wrapper">
        <div className="company-wrapper">
            <h3>Company</h3>
          <div>
            <p>About Us</p>
          </div>
          <div>
            <p>Terms & Conditions</p>
          </div>
          <div>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className="customer-wrapper">
            <h3>For Customers</h3>
          <div>
            <p>Contact Us</p>
          </div>
          <div>
            <p>On Demand Service Reviews</p>
          </div>
        </div>
        <div className="professional-wrapper">
            <h3>For Professionals</h3>
          <div>
            <p>Register as a professional</p>
          </div>
        </div>
        <div className="social-link-wrapper">
            <h3>Social Links</h3>
          <div>
            <img src="" alt="" />
            <p>Twitter</p>
          </div>
          <div>
            <img src="" alt="" />
            <p>Facebook</p>
          </div>
          <div>
                <img src="" alt="" />
                <p>Instagram</p>
            </div>
        </div>
        </div>
        <div className="copyright"> 
            <p>Copyright@2024 All Rights Reserved</p>
        </div>
    </div>
  );
};

export default Footer;
