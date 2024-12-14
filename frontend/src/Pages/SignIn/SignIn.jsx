import React from 'react';
import { Link } from 'react-router-dom';
import SignInCustomer from './SignInCustomer.jsx';
import SignInTradesman from './SignInTradesman';


const SignIn = () => {
  return (
    <div className="signin-wrapper">
      <div>
        <Link to="/signincustomer">
          <button>Customer SignIn</button>
        </Link>
      </div>
      <div>
      <Link to="/signintradesman">
          <button>Tradesman SignIn</button>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
