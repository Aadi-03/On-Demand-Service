import "./SignIn.css";
import "./SignInCustomer.css";


import Navbar from "../../Components/Navbar/Navbar";
import NewNavbar  from "../../Components/NewNavbar/NewNavbar.jsx";
import Footer from "../../Components/Footer/Footer";

import { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const SignInCustomer = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate();
  const location=useLocation();
  useEffect(()=>{
    if(localStorage.getItem("customerToken")){
      navigate('/customer/dashboard',{
        state:{
          error:"You are already signed in"
        }
      });
    }
    if(location.state?.error){
      toast.error(location.state.error, { 
        position: "top-right" 
      });
      window.history.replaceState({},document.title);
    }
  },[location]);
  

  async function handleClick(e){

    e.preventDefault();
    let newData=JSON.stringify({
      email: data.email,
      password: data.password
    });

    let config={
      method:"post",
      maxBodyLength:Infinity,
      url:"http://localhost:3000/customer/signin",
      headers:{
        "Content-Type":"application/json"
      },
      data:newData
    };

    async function makeRequest(){
      try{
        const response=await axios.request(config);
        console.log(JSON.stringify(response.data));
        if(response.data.error){
          toast.error(response.data.error);
        }
        else{
          toast.success("Sign In Successful");
          localStorage.setItem("customerToken", response.data.token);
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate('/customer/dashboard');
        }
      }
      catch(error){
        console.log(error);
      }
    }
    makeRequest();

  }

  return (
    <>
    {/* <Navbar /> */}
    <NewNavbar/>
    <ToastContainer position="bottom-right" autoClose={3000} theme="light"/>
    <div className="signin-customer-wrapper">
        <div className="email-wrapper">
            <label >Email :</label>
            <input type="text" placeholder='email' onChange={(e)=>{
                setData({...data, email: e.target.value})
            }} />
        </div>
        <div className="password-wrapper">
            <label >Password: </label>
            <input type="password" placeholder='password' onChange={(e)=>{
              setData({...data,password:e.target.value})
            }} />
        </div>
        <div>
            <button onClick={handleClick}>Sign In</button>
        </div>
    </div>
    <Footer />
    </>
  );
};
export default SignInCustomer;
