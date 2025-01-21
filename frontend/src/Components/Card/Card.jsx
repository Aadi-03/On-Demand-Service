import { IoIosCall } from "react-icons/io";
import "./Card.css";
import * as React from 'react';
import Rating from '@mui/material/Rating';
const Card = () => {
        return (
                <div className="card">
                        <div className="image">

                        </div>
                        <div className="info">
                                <div className="type">
                                        electrician
                                </div>
                                {/* <div className="rating">
                                        4.7 &#127775;
                                </div> */}

                                <Rating name="half-rating-read" defaultValue={3.5} precision={0.1} readOnly />

                        </div>
                        <div className="call">
                                <IoIosCall />
                                +91-1234567890

                        </div>

                </div>
        );
}
export default Card;