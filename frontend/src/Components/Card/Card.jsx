import { IoIosCall } from "react-icons/io";
import "./Card.css";
import * as React from "react";
import Rating from "@mui/material/Rating";
import { toast, ToastContainer } from "react-toastify";

const handleRequestService = () => {
    toast.success("Service Requested Successfully");
    
}

const Card = ({ name, age, distance, workType, rating, phoneNo, onClick }) => {
    const cardClass = distance ? "card" : "card card--no-distance";
    return (
        <>
            <ToastContainer position="bottom-right" autoClose={3000} theme="light"/>
            <div className={cardClass} onClick={onClick}>
                <div className="image"></div>
                <div className="details">
                    <div className="name-age">
                        <span className="name">{name}</span>
                        <span className="age">{age} yrs</span>
                    </div>
                    {distance && <div className="distance">{distance} km away</div>}
                    <div className="type">
                        {workType}
                        <Rating name="half-rating-read" value={rating} precision={0.1} readOnly size="small" />
                    </div>
                </div>
                <div className="call">
                    <IoIosCall />
                    <span>+91-{phoneNo}</span>
                </div>
                <button className="select-worker" onClick={() => handleRequestService()}>Request Service</button>
            </div>
        </>
    );
};

export default Card;
