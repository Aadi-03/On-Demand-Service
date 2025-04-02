import "./SignIn.css";
import "./SignInCustomer.css";
import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaHome, FaArrowRight, FaEnvelope } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NewNavbar from "../../Components/NewNavbar/NewNavbar.jsx";
import Footer from "../../Components/Footer/Footer";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const SignInCustomer = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (localStorage.getItem("customerToken")) {
      navigate('/customer/dashboard', {
        state: {
          info: "You were already signed in"
        }
      });
    }
    
    if (location.state?.error) {
      toast.error(location.state.error);
      window.history.replaceState({}, document.title);
    }
  }, [location, navigate]);

  async function handleClick(e) {
    e.preventDefault();
    
    if (!data.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    
    if (!data.password) {
      toast.error("Please enter your password");
      return;
    }
    
    setIsSubmitting(true);
    
    let newData = JSON.stringify({
      email: data.email,
      password: data.password
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/customer/signin",
      headers: {
        "Content-Type": "application/json"
      },
      data: newData
    };

    try {
      const response = await axios.request(config);
      
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        localStorage.setItem("customerToken", response.data.token);
        navigate('/customer/dashboard', { state: { success: "Sign In Successful" }});
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <NewNavbar />
      <ToastContainer position="bottom-right" autoClose={5000} theme="colored" />
      
      <div className="signin-customer-page">
        <div className="signin-customer-container">
          <div className="signin-card">
            <div className="signin-card-header">
              <div className="signin-card-icon">
                <FaHome />
              </div>
              <h2>Welcome Back</h2>
              <p>Sign in to access your customer account</p>
            </div>
            
            <form className="signin-form" onSubmit={handleClick}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email"
                  placeholder="Enter your email" 
                  value={data.email}
                  onChange={(e) => setData({...data, email: e.target.value})}
                />
                <div className="form-icon">
                  <FaEnvelope />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) => setData({...data, password: e.target.value})}
                />
                <div className="form-icon">
                  <FaLock />
                </div>
                <a href="#!" className="forgot-password">Forgot password?</a>
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'} {!isSubmitting && <FaArrowRight style={{marginLeft: '5px'}} />}
              </button>
            </form>
          </div>
          
          <div className="signin-footer">
            <p>Don't have an account? <Link to="/signupcustomer">Register as Customer</Link></p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default SignInCustomer;