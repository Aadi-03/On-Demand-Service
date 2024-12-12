import "./LandingPage.css";
import Footer from "../Footer/Footer.jsx";


import logo from "../../../public/Company-Logo.png";
import cart from "../../assets/LandingPageImages/cart.png";
import user from "../../assets/LandingPageImages/user.png";
import location from "../../assets/LandingPageImages/location.png";
import search from "../../assets/LandingPageImages/search.png";

import plumber from "../../assets/LandingPageImages/plumber.jpg";
import electrician from "../../assets/LandingPageImages/electrician.jpg";
import painter from "../../assets/LandingPageImages/painter.jpg";
import mechanic from "../../assets/LandingPageImages/mechanic.jpg";

import carpenterlogo from "../../assets/LandingPageImages/carpenter_logo.png";
import electricianlogo from "../../assets/LandingPageImages/electrician_logo.png";
import mechaniclogo from "../../assets/LandingPageImages/mechanic_logo.png";
import plumberlogo from "../../assets/LandingPageImages/plumber_logo.png";

const LandingPage = () => {
  return (
    <>
      <div className="LandingPage-Navbar">
        <img src={logo} alt="" className="logo" />
        <div className="Search-boxes">
          <div className="containers">
            <img src={location} alt="" className="placeholdericon" />
            <input
              type="text"
              className="location"
              placeholder="Enter your location"
            />
          </div>
          <div className="containers">
            <img src={search} alt="" className="placeholdericon" />
            <input
              type="text"
              className="services"
              placeholder="Search for Services"
            />
          </div>
        </div>
        <div className="icons">
          <img src={cart} alt="" className="cart" />
          <img src={user} alt="" className="user" />
        </div>
      </div>

      <hr className="horizontal-rule" />

      <div className="Landing-Page">
        <div className="info-services">
          <div className="text">
            <h1>Find the best services near you</h1>
            <p>Fast , Reliable , On-Demand</p>
          </div>

          <div className="services">
            <p>What are you looking for?</p>
            <div className="services-logo">
              <div>
                <img src={plumberlogo} alt="" />
                <h6>Plumber</h6>
              </div>
              <div>
                <img src={electricianlogo} alt="" />
                <h6>Electrician</h6>

              </div>
              <div>
                <img src={mechaniclogo} alt="" />
                <h6>Mechanic</h6>
              </div>
              <div>
                <img src={carpenterlogo} alt="" />
                <h6>Carpenter</h6>
              </div>
            </div>
          </div>

          <div className="info"></div>
        </div>
        <div className="images">
          <div className="holder">
            <img src={plumber} alt="" className="plumber" />

            <img src={electrician} alt="" className="electrician" />

            <img src={painter} alt="" className="painter" />

            <img src={mechanic} alt="" className="mechanic" />
          </div>
        </div>
      </div>
      <hr className="horizontal-rule" />
       <Footer></Footer> 
    </>
  );
};

export default LandingPage;
