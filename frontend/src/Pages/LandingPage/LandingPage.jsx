import "./LandingPage.css";
import logo from "../../../public/Company-Logo.png";
import cart from "../../assets/LandingPageImages/cart.png";
import user from "../../assets/LandingPageImages/user.png";
import location from "../../assets/LandingPageImages/location.png";
import search from "../../assets/LandingPageImages/search.png";

import plumber from "../../assets/LandingPageImages/plumber.jpg";
import electrician from "../../assets/LandingPageImages/electrician.jpg";
import painter from "../../assets/LandingPageImages/painter.jpg";
import mechanic from "../../assets/LandingPageImages/mechanic.jpg";

const LandingPage = () => {

        return (
                <>
                        <div className="LandingPage-Navbar">
                                <img src={logo} alt="" className="logo" />
                                <div  className="Search-boxes">
                                        <div className="containers">
                                                <img src={location} alt="" className="placeholdericon" />
                                                <input type="text" className = "location" placeholder="Enter your location" />

                                        </div>
                                        <div className="containers">
                                                <img src={search} alt="" className="placeholdericon" />
                                                <input type="text" className = "services" placeholder="Search for Services" />
                                        </div>
                                </div>
                                <div className="icons">
                                        <img src={cart} alt="" className="cart" />
                                        <img src={user} alt="" className="user" />
                                </div>
                        </div>

                        <div className="Landing-Page">
                                <div className="info-services">
                                        <div className="text">
                                                <h1>Find the best services near you</h1>
                                                <p>Fast , Reliable , On-Demand</p>
                                        </div>

                                        <div className="services">
                                                <p>What are you looking for?</p>
                                        </div>

                                        <div className="info">
                                                
                                        </div>


                                </div>
                                <div className="images">
                                        <div className="holder">
                                                <img src={plumber} alt="" className="plumber" />

                                                <img src= {electrician} alt="" className="electrician" />

                                                <img src={painter} alt="" className="painter" />

                                                <img src={mechanic} alt="" className="mechanic" />
                                        </div>

                                </div>
                        </div>



                </>
        );
}

export default LandingPage;