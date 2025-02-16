import React, { useState } from 'react';
import NewCustomerNavbar from '../../Components/NewNavbar/NewCustomerNavbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import {useEffect} from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';
import './History.css';

const History = () => {
  const [history , setHistory] = useState([]);
  useEffect(() => {
    const fetchHistory=async()=>{
      try{
    let newData=JSON.stringify({userId:localStorage.getItem("currentUser")});
    console.log(newData);
    const url = `http://localhost:3000/customer/auth/orderhistory`;
    console.log(url);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `bearer ${localStorage.getItem("customerToken")}`,
      },
        data: newData,
      }
      const response = await axios.request(config);
      console.log(response.data);
      setHistory(response.data['orders']);
    }
      catch(err)
      {
        console.log(err);
      }
    }
    fetchHistory();
  }, []);
  return (
    <div className='histroy-page'>
      <NewCustomerNavbar/>
        <h1 style={{textAlign:"center"}}>History</h1>
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {history.length > 0 ? (
                history.map((order, index) => (
                  <div key={index} style={{ border: '1px solid black', padding: '20px', margin: '10px', width: '80%' }}>
                    <h3>Order ID: {order.orderId}</h3>
                    <p>Work Type : {order.providerWorkType}</p>
                    <p>Name : {order.providerName}</p>
                    <p>Phone Number : {order.providerPhone}</p>
                    <p>Email : {order.providerEmail}</p>
                    <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p>Order Rating : {order.orderRating}</p>
                    <p>Feedback : {order.orderFeedback}</p>
                  </div>
                ))
              ) : (
                <p>No order history available.</p>
              )}
            </div>
        </div>
        <Footer/>

    </div>
  );
}

export default History;
