import { IoIosCall } from "react-icons/io";
import "./Card.css";
import * as React from "react";
import Rating from "@mui/material/Rating";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import available from '../../assets/available.png';
import unavailable from '../../assets/unavailable.png';
const Card = ({ providerId,name, age, distance, workType, rating, phoneNo, status, onClick,image }) => {
    const [open,setOpen]=React.useState(false)
    const cardClass = distance ? "card" : "card card--no-distance";
    // console.log(image);
    
    return (
        <>
            <div className="provider-complete-card-holder">
                <img src= {(status) ? available : unavailable} alt="" className="providerStatus" />
                <div className="provider-card-container">
                    <div className={cardClass} onClick={onClick}>
                        <div className="image">
                            <img src={image} alt={name} loading="lazy" />
                        </div>
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
                        {/* <div className="call">
                            <IoIosCall />
                            <span>+91-{phoneNo}</span>
                        </div> */}
                    </div>
                    <button className="select-worker" onClick={()=>{setOpen(!open)}}>Request Service</button>
                </div>
                {open && <Input setOpen={setOpen} providerId={providerId} name={name}/>}
            </div>
        </>
    );
};

const Input = ({setOpen,providerId,name}) => {
    const [title,setTitle]=React.useState();
    const [desc,setDesc]=React.useState();
    const handleSubmit=(e)=>{
        e.preventDefault(); 
        // console.log(title,desc,providerId);
        let data = JSON.stringify({
            "name": title,
            "description": desc,
            "providerId": providerId
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/customer/auth/createOrder',
            headers: { 
                Authorization: `bearer ${localStorage.getItem("customerToken")}`, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          async function makeRequest() {
            try {
              const response = await axios.request(config);
            //   console.log((response.data));
            if(response.data.error){
              toast.error(response.data.error);
            }else{
                toast.success("Order placed to "+name);
            }
            }
            catch (error) {
              console.log(error);
            }
            finally {
              setOpen((c)=>!c);
            }
          }
          makeRequest();
        
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
