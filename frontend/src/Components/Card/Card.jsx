import { IoIosCall } from "react-icons/io";
import "./Card.css";
import * as React from "react";
import Rating from "@mui/material/Rating";
import { ToastContainer, toast } from 'react-toastify';
const Card = ({ providerId,name, age, distance, workType, rating, phoneNo, onClick }) => {
    const [open,setOpen]=React.useState(false)
    const cardClass = distance ? "card" : "card card--no-distance";
    return (
        <>
            <div className="provider-complete-card-holder">
                <div className="provider-card-container">
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
                    </div>
                    <button className="select-worker" onClick={()=>{setOpen(!open)}}>Request Service</button>
                </div>
                {open && <Input setOpen={setOpen} providerId={providerId}/>}
            </div>
        </>
    );
};

const Input = ({setOpen,providerId}) => {
    const [title,setTitle]=React.useState();
    const [desc,setDesc]=React.useState();
    const handleSubmit=(e)=>{
        e.preventDefault(); 
        console.log(title,desc,providerId);
        setOpen((c)=>!c);
        toast.success("Order placed");
        
    }
    return (
        <div className="descriptionComponent">
            <div className="description-container">
                <h3>Enter Description of Task</h3>
                <form onSubmit={handleSubmit} className="description-form" >
                    <input type="text" placeholder="Enter the title" onChange={(e)=>setTitle(e.target.value)}/>
                    <textarea placeholder="Enter Description" onChange={(e)=>setDesc(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
                    <button type="submit">Submit</button>
                </form>
                <button className="close-button" onClick={() => { setOpen((c)=>!c) }}>Close</button>
            </div>
        </div>
    )
}

export default Card;
