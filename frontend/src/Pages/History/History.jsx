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
              <div key={index} className={`historycard ${order.orderState}`} >
                <div className="order-details">
                  <div className="detail">
                    <b>Task ID : </b>
                    <p>{order.orderId}</p>
                  </div>
                  <div className="detail">
                    <b>Date : </b>
                    <p>{order.orderDate}</p>
                  </div>
                </div>

                <h3>Task Details</h3>
                <div className="task-detail">

                  <div className="detail">
                    <b>Title : </b>
                    <p> {order.orderTitle}</p>
                  </div>
                  <div className="detail">
                    <b>Description : </b>
                    <p>{order.orderDescription}</p>
                  </div>
                </div>

                <h3>Worker Details</h3>
                <div className="worker-details">
                  <div className="detail">
                    <b>Name : </b>
                    <p>{order.providerName}</p>
                  </div>
                  <div className="detail">
                    <b>Phone : </b>
                    <p>{order.providerPhone}</p>
                  </div>
                  <div className="detail">
                    <b>Email : </b>
                    <p>{order.providerEmail}</p>
                  </div>
                  <div className="detail">
                    <b>Work Type : </b>
                    <p>{order.providerWorkType}</p>
                  </div>
                </div>

                <h3>Reviews</h3>
                <div className="detail">
                  <b>Rating : </b>
                  <p>{order.orderRating}</p>
                </div>
                <div className="detail">
                  <b>Feedback : </b>
                  <p>{order.orderFeedback}</p>
                </div>
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
