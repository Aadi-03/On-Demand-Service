import { IoIosCall } from "react-icons/io";
import "./Card.css";
import * as React from 'react';
import Rating from '@mui/material/Rating';
const Card = ({workType,rating,phoneNo,onClick}) => {
        return (
                <div className="card" onClick={onClick}>
                        <div className="image">

                        </div>
                        <div className="info">
                                <div className="type">
                                        {workType}
                                </div>
                                {/* <div className="rating">
                                        4.7 &#127775;
                                </div> */}

                                <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly />

                        </div>
                        <div className="call">
                                <IoIosCall />
                                +91-{phoneNo}

                        </div>

                </div>
        );
}
export default Card;