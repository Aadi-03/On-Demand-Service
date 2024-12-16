import React from 'react';
import { Link } from 'react-router-dom';
import "./SignIn.css";
import SignInCustomer from './SignInCustomer.jsx';
import SignInTradesman from './SignInTradesman.jsx';
import customer from'../../assets/LandingPageImages/customer-logo.jpeg';
import service_provider from'../../assets/LandingPageImages/service-provider-logo.png';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';

const SignIn = () => {
  return (
    <>
    <Navbar />
    <div className="signin-wrapper">
      <div className='signin-container'>
        <h1>SignIn</h1>

        <div className="buttons">
          <Link to="/signincustomer">
          <figure>
            <img src={customer} alt="" />
            <figcaption>Customer SignIn</figcaption>
          </figure>
          </Link>

          <Link to="/signintradesman">
          <figure>
            <img src={service_provider} alt="" />
            <figcaption>Tradesman SignIn</figcaption>
          </figure>
          </Link>
        </div>
        <p>Don't have an account? <Link to = '/signup'>Sign Up </Link></p>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default SignIn;
