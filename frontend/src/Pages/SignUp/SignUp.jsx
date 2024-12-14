import React from 'react';
import { Link } from 'react-router-dom';
import "./SignUp.css";
import SignInCustomer from './SignUpCustomer.jsx';
import SignInTradesman from './SignUpTradesman.jsx';
import customer from'../../assets/LandingPageImages/customer-logo.jpeg';
import service_provider from'../../assets/LandingPageImages/service-provider-logo.png';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer.jsx';

const SignIn = () => {
  return (
    <>
    <Navbar />
    <div className="signin-wrapper">
      <div className='signin-container'>
        <h1>SignUp</h1>

        <div className="buttons">
          <Link to="/signupcustomer">
          <figure>
            <img src={customer} alt="" />
            <figcaption>Customer SignUp</figcaption>
          </figure>
          </Link>

          <Link to="/signuptradesman">
          <figure>
            <img src={service_provider} alt="" />
            <figcaption>Tradesman SignUp</figcaption>
          </figure>
          </Link>
        </div>
        <p>Already have an account! <Link to = '/signin'>Sign In </Link></p>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default SignIn;
