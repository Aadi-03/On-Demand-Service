import NewCustomerNavbar from '../../Components/NewNavbar/NewCustomerNavbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Profile.css";

const CustomerProfile = () => {
    let [user, setUser] = useState({});

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/customer/auth/profile',
            headers: {
                "Authorization": `bearer ${localStorage.getItem('customerToken')}`
            }
        };
        async function makeRequest() {
            try {
                const response = await axios.request(config);
                setUser(response.data.customer);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        makeRequest();
    }, []);

    return (
        <>
            <NewCustomerNavbar />
            <div className="profile-card">
                <h2 className="profile-name">
                    {user.firstName} {user.lastName}
                </h2>
                <div className="profile-details profile-email"><b>Email: </b>  <p>{user.email}</p></div>
                <div className="profile-details profile-phone"><b>Phone: </b> <p>{user.phoneNumber}</p></div>
                <div className="profile-details profile-gender"><b>Gender: </b> <p>{user.gender}</p></div>
                <div className="profile-details profile-dob"><b>DOB: </b> <p>{new Date(user.dob).toLocaleDateString()}</p></div>
                <div className="profile-details profile-orders"><b>Orders: </b> <p>{user?.orders?.length}</p></div>
                <div className="profile-details profile-fav"><b>Favorites: </b> <p>{user?.favorites?.length}</p></div>
                <div className="profile-details profile-feedbacks"><b>Feedbacks: </b> <p>{user?.feedbacks?.length}</p></div>
                <div className="profile-address">
                    <h3 className="address-title">Address</h3>
                    <p className="address-detail">{user?.address?.houseNumber}, {user?.address?.streetName}, {user?.address?.state}, {user?.address?.country}</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CustomerProfile;