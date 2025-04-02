import React from 'react';
import { Link } from 'react-router-dom';
import "./SignIn.css";
import NewNavbar from '../../Components/NewNavbar/NewNavbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import { FaUser, FaTools, FaChevronRight } from 'react-icons/fa';

const SignIn = () => {
  return (
    <>
      <NewNavbar />
      <div className="signin-wrapper">
        <div className='signin-container'>
          <h1>Sign In</h1>

          <div className="buttons">
            <Link to="/signincustomer" className="signin-button button-customer">
              <div className="button-icon">
                <FaUser size={20} />
              </div>
              <div className="button-content">
                <div className="button-title">Customer</div>
                <div className="button-subtitle">Book services & track your requests</div>
              </div>
              <div className="button-arrow">
                <FaChevronRight />
              </div>
            </Link>

            <Link to="/signintradesman" className="signin-button button-tradesman">
              <div className="button-icon">
                <FaTools size={20} />
              </div>
              <div className="button-content">
                <div className="button-title">Professional</div>
                <div className="button-subtitle">Manage jobs & grow your business</div>
              </div>
              <div className="button-arrow">
                <FaChevronRight />
              </div>
            </Link>
          </div>

          <div className="signin-footer">
            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;