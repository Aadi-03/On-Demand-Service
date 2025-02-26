import React from 'react';
import "./SignInTradesman.css";



import Navbar from "../../Components/Navbar/Navbar";
import NewNavbar from '../../Components/NewNavbar/NewNavbar.jsx';
import Footer from "../../Components/Footer/Footer";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInTradesman = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate();

  

  async function handleClick(e){

    e.preventDefault();
    let newData=JSON.stringify({
      email: data.email,
      password: data.password
    });

    let config={
      method:"post",
      maxBodyLength:Infinity,
      url:"http://localhost:3000/provider/signin",
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
          alert(response.data.error);
        }
        else{
          alert("Customer signed in successfully");
          localStorage.setItem("providerToken", response.data.token);
          navigate('/provider/dashboard');
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
        <div className="signin-tradesman-wrapper">
        <div className="email-wrapper">
            <label >Email :</label>
            <input type="text" placeholder='email' onChange={(e)=>{
              setData({...data,email:e.target.value})
            }}/>
        </div>
        <div className="password-wrapper">
            <label >Password: </label>
            <input type="password" placeholder='password' onChange={(e)=>{
              setData({...data,password:e.target.value})
            }} />
        </div>
        <div>
            <button onClick={handleClick}> Sign In</button>
        </div>
    </div>
    <Footer />
    </>
  );
}

export default SignInTradesman;
