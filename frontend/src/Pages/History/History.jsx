import React, { useState } from 'react';
import NewCustomerNavbar from '../../Components/NewNavbar/NewCustomerNavbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';
import './History.css';

const History = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let newData = JSON.stringify({ userId: localStorage.getItem("currentUser") });
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
      catch (err) {
        console.log(err);
      }
    }
    fetchHistory();
  }, []);
  return (
    <>
      <NewCustomerNavbar />
      <div className='history-page'>
        <h1 style={{ textAlign: "center" }}>History</h1>
        <div className="historycontainer" >
          {history.length > 0 ? (
            history.map((order, index) => (
              <div key={index} className="historycard" style={{ backgroundColor: order.orderCompleted ? 'lightgreen' : 'lightcoral' }}>
                <div className="id-date">
                  <h3>Order ID: {order.orderId}</h3>
                  <p> <b> Date: </b> {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <p><b>Work Type : </b> {order.providerWorkType}</p>
                <p> <b> Name : </b>{order.providerName}</p>
                <p> <b> Phone Number : </b> {order.providerPhone}</p>
                <p> <b> Email : </b> {order.providerEmail}</p>
                <p> <b> Order Rating : </b> {order.orderRating}</p>
                <p> <b> Feedback : </b> {order.orderFeedback}</p>
              </div>
            ))
          ) : (
            <p>No order history available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default History;
