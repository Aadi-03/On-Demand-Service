import NewCustomerNavbar from '../../Components/NewNavbar/NewCustomerNavbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Profile.css";

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const CustomerProfile = () => {
    let [user, setUser] = useState({});
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/customer/auth/profile',
            headers: {
                "Authorization": `bearer ${localStorage.getItem('customerToken')}`
            }
        };
        async function makeRequest() {
            try {
                const response = await axios.request(config);
                setUser(response.data.customer);
                console.log(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        makeRequest();
    }, []);

    // Skeleton profile component
    const ProfileSkeleton = () => (
        <div className="profile-card skeleton-profile">
            <h2 className="profile-name skeleton-text skeleton-name"></h2>
            <div className="profile-details"><b className="skeleton-label"></b> <p className="skeleton-text"></p></div>
            <div className="profile-details"><b className="skeleton-label"></b> <p className="skeleton-text"></p></div>
            <div className="profile-details"><b className="skeleton-label"></b> <p className="skeleton-text"></p></div>
            <div className="profile-details"><b className="skeleton-label"></b> <p className="skeleton-text"></p></div>
            <div className="profile-details"><b className="skeleton-label"></b> <p className="skeleton-text"></p></div>
            <div className="profile-details"><b className="skeleton-label"></b> <p className="skeleton-text"></p></div>
            <div className="profile-details"><b className="skeleton-label"></b> <p className="skeleton-text"></p></div>
            <div className="profile-details"><b className="skeleton-label"></b> <p className="skeleton-text"></p></div>
            <div className="profile-address skeleton-address">
                <h3 className="address-title skeleton-text skeleton-title"></h3>
                <p className="address-detail skeleton-text skeleton-long"></p>
            </div>
        </div>
    );

    return (
        <>
            <NewCustomerNavbar />
            {loading ? (
                <ProfileSkeleton />
            ) : (
                <div className="profile-card">
                    <h2 className="profile-name">
                        Hi {user.firstName}! , Welcome Back
                    </h2>
                    <div className="profile-details profile-fullname"><b>Full Name: </b>  <p>{user.firstName} {user.lastName}</p></div>
                    <div className="profile-details profile-email"><b>Email: </b>  <p>{user.email}</p></div>
                    <div className="profile-details profile-phone"><b>Phone: </b> <p>{user.phoneNumber}</p></div>
                    <div className="profile-details profile-gender"><b>Gender: </b> <p>{user.gender}</p></div>
                    <div className="profile-details profile-dob"><b>DOB: </b> <p>{new Date(user.dob).toLocaleDateString()}</p></div>
                    <div className="profile-details profile-age"><b>Age: </b> <p>{calculateAge(user.dob)} years</p></div>
                    <div className="profile-details profile-orders"><b>Total Services Availed: </b> <p>{user?.orders?.length}</p></div>
                    <div className="profile-details profile-fav"><b>Favorites: </b> <p>{user?.favorites?.length}</p></div>
                    <div className="profile-details profile-feedbacks"><b>Feedbacks Given : </b> <p>{user?.feedbacks?.length}</p></div>
                    <div className="profile-address">
                        <h3 className="address-title">Address</h3>
                        <p className="address-detail">{user?.address?.houseNumber}, {user?.address?.streetName}, {user?.address?.state}, {user?.address?.country}</p>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default CustomerProfile;