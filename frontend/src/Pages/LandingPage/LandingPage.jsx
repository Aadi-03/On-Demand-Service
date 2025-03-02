import "./LandingPage.css";
import Footer from "../../Components/Footer/Footer.jsx";

import plumber from "../../assets/LandingPageImages/plumber.jpg";
import electrician from "../../assets/LandingPageImages/electrician.jpg";
import painter from "../../assets/LandingPageImages/painter.jpg";
import mechanic from "../../assets/LandingPageImages/mechanic.jpg";
import carpenter from "../../assets/LandingPageImages/carpenter.jpeg";

import carpenterlogo from "../../assets/LandingPageImages/carpenter_logo.png";
import electricianlogo from "../../assets/LandingPageImages/electrician_logo.png";
import mechaniclogo from "../../assets/LandingPageImages/mechanic_logo.png";
import plumberlogo from "../../assets/LandingPageImages/plumber_logo.png";

import Navbar from "../../Components/Navbar/Navbar.jsx";
import NewNavbar from "../../Components/NewNavbar/NewNavbar.jsx";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const location=useLocation();
  useEffect(()=>{
    if(location.state?.logout){
      // console.log("logout");
      
      toast.success("Logout Successful");
      window.history.replaceState({}, document.title);
    }


  },[location])
  

  return (

    <>
      {/* <Navbar/> */}
      <NewNavbar/>
      <ToastContainer position="bottom-right"/>
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
