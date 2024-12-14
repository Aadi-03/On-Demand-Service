import "./LandingPage.css";
import Footer from "../Footer/Footer.jsx";


import logo from "../../assets/LandingPageImages/Company-Logo.png";
import cart from "../../assets/LandingPageImages/cart.png";
import user from "../../assets/LandingPageImages/user.png";
import location from "../../assets/LandingPageImages/location.png";
import search from "../../assets/LandingPageImages/search.png";

import plumber from "../../assets/LandingPageImages/plumber.jpg";
import electrician from "../../assets/LandingPageImages/electrician.jpg";
import painter from "../../assets/LandingPageImages/painter.jpg";
import mechanic from "../../assets/LandingPageImages/mechanic.jpg";
import carpenter from "../../assets/LandingPageImages/carpenter.jpeg";

import carpenterlogo from "../../assets/LandingPageImages/carpenter_logo.png";
import electricianlogo from "../../assets/LandingPageImages/electrician_logo.png";
import mechaniclogo from "../../assets/LandingPageImages/mechanic_logo.png";
import plumberlogo from "../../assets/LandingPageImages/plumber_logo.png";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  const handleSignin = () => {
    navigate('/signin');
  }
  const handleSignup = () => {
    navigate('/signup');
  }
  

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
        </div>
        <div className="signupsignin">
          <button className="signin" onClick={handleSignin}>Sign In</button>
          <button className="signup" onClick={handleSignup}>Sign Up</button>
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
              <figure>
                <img src={plumberlogo} alt="" />
                <figcaption>Plumber</figcaption>
              </figure>
              <figure>
                <img src={electricianlogo} alt="" />
                <figcaption>Electrician</figcaption>

              </figure>
              <figure>
                <img src={mechaniclogo} alt="" />
                <figcaption>Mechanic</figcaption>
              </figure>
              <figure>
                <img src={carpenterlogo} alt="" />
                <figcaption>Carpenter</figcaption>
              </figure>
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
            <img src={carpenter} alt="" className="carpenter" />

          </div>
        </div>
      </div>
      <hr className="horizontal-rule" />
       <Footer></Footer> 
    </>
  );
};

export default LandingPage;
