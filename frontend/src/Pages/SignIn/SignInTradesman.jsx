import React from 'react';
import "./SignInTradesman.css";



import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const SignInTradesman = () => {
  return (
    <>
    <Navbar />
    <div className="signin-tradesman-wrapper">
        <div className="email-wrapper">
            <label >Email :</label>
            <input type="text" placeholder='email' />
        </div>
        <div className="password-wrapper">
            <label >Password: </label>
            <input type="text" placeholder='password' />
        </div>
        <div>
            <button>Sign In</button>
        </div>
    </div>
    <Footer />
    </>
  );
}

export default SignInTradesman;
