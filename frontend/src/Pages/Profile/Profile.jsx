import NewCustomerNavbar from '../../Components/NewNavbar/NewCustomerNavbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Profile.css";

const CustomerProfile = () => {

    let [user, setUser] = useState({});

    useEffect(()=>{
        let config={
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/customer/auth/profile',
            headers:{
                "Authorization":`bearer ${localStorage.getItem('customerToken')}`
            }
        };
        async function makeRequest()
        {
            try{
                const response = await axios.request(config);
                setUser(response.data.customer)
                // console.log(response.data);
                
            }
            catch(err)
            {
                console.log(err);
            }
        }
        makeRequest();

    },[])
    return (
    <>
    <NewCustomerNavbar/>
    <div className="profile-card">
      <h2 className="profile-name">
        {user.firstName} {user.lastName}
      </h2>
      <p className="profile-email">Email: {user.email}</p>
      <p className="profile-phone">Phone: {user.phoneNumber}</p>
      <p className="profile-gender">Gender: {user.gender}</p>
      <p className="profile-dob">DOB: {new Date(user.dob).toLocaleDateString()}</p>
       <div className="profile-address">
        <h3 className="address-title">Address</h3>
         <p className="address-detail">{user?.address?.houseNumber}, {user?.address?.streetName}</p>
        <p className="address-location">{user?.address?.state}, {user?.address?.country}</p> 
      </div>  
    </div>
    <Footer/>
    </>
    )
};

export default CustomerProfile;