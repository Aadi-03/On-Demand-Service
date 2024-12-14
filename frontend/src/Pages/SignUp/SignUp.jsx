import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import SignUpTradesman from "./SignUpTradesman.jsx";
import SignUpCustomer from "./SignUpCustomer.jsx";

const SignUp = () => {
  return (
    <div className="signup-wrapper">
      <div>
        <Link to="/signupcustomer">
          <button>Customer SignUp</button>
        </Link>
      </div>
      <div>
      <Link to="/signuptradesman">
          <button>Tradesman SignUp</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
