import React, { useState } from 'react';
import NewCustomerNavbar from '../../Components/NewNavbar/NewCustomerNavbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';
import './History.css';
import HistoryCard from '../../Components/HistoryCard/HistoryCard.jsx';
import { toast, ToastContainer } from "react-toastify";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Tab, setTab] = useState('pending');
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [unaccepted, setUnaccepted] = useState([]);
  const [partialCompleted, setpartialCompleted] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let newData = JSON.stringify({ userId: localStorage.getItem("currentUser") });
        console.log(newData);
        const url = `http://localhost:5000/customer/auth/orderhistory`;
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
        // console.log(response.data);
        setHistory(response.data['orders']);

        let pendingOrders = [];
        let completedOrders = [];
        let rejectedOrders = [];
        let unacceptedOrders = [];
        let paritalcomplete = [];

        response.data['orders'].forEach((order) => {
          if(order.orderState === 'COMPLETED' && order.orderCompleted == true){
            completedOrders.push(order);
          }
          else if (order.orderState === 'PENDING') {
            pendingOrders.push(order);
          }
          else if (order.orderState === 'COMPLETED') {  
            paritalcomplete.push(order);
          }
          else if (order.orderState === 'REJECTED') {
            rejectedOrders.push(order);
          }
          else {
            unacceptedOrders.push(order);
          }
        }
        );
        setPending(pendingOrders);
        setCompleted(completedOrders);
        setRejected(rejectedOrders);
        setUnaccepted(unacceptedOrders);
        setpartialCompleted(paritalcomplete);
        setLoading(false);
      }
      catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="historycard skeleton-card">
      <div className="order-details">
        <div className="detail skeleton-text"></div>
        <div className="detail skeleton-text"></div>
      </div>

      <h3 className="skeleton-text skeleton-title"></h3>
      <div className="task-detail">
        <div className="detail skeleton-text"></div>
        <div className="detail skeleton-text skeleton-long"></div>
      </div>

      <h3 className="skeleton-text skeleton-title"></h3>
      <div className="worker-details">
        <div className="detail skeleton-text"></div>
        <div className="detail skeleton-text"></div>
        <div className="detail skeleton-text"></div>
        <div className="detail skeleton-text"></div>
      </div>

      <h3 className="skeleton-text skeleton-title"></h3>
      <div className="detail skeleton-text"></div>
      <div className="detail skeleton-text skeleton-long"></div>
    </div>
  );

  const handleSetTab = (tab) => {
    const btns = document.querySelectorAll('.history-tabs button');
    btns.forEach(btn => btn.classList.remove('clicked'));
    setTab(tab);
    const btn = document.querySelector(`.${tab}`);
    btn.classList.add('clicked');
  }
  return (
    <>
    <ToastContainer position="bottom-right"/>
      <NewCustomerNavbar />
      <div className={`history-page`}>
        <h1 style={{ textAlign: "center" }}>History</h1>
        <div className="historycontainer">
          {loading ? (
            // Show 3 skeleton cards while loading
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <div className="history-tabs">
                <button className="all" onClick={() => handleSetTab('all')}>All</button>
                <button className="partialcompleted" onClick={() => handleSetTab('partialcompleted')}>Partial Completed</button>
                <button className="pending" onClick={() => handleSetTab('pending')}>Pending</button>
                <button className="unaccepted" onClick={() => handleSetTab('unaccepted')}>Unaccepted</button>
                <button className="completed" onClick={() => handleSetTab('completed')}>Completed</button>
                <button className="rejected" onClick={() => handleSetTab('rejected')}>Rejected</button>
              </div>

              {Tab === 'all' && (
                <>
                  {pending.map((order) => (
                    <HistoryCard key={order.id} order={order} tab={'pending'} setPending={setPending} setCompleted={setCompleted} setRejected={setRejected}/>
                  ))}
                  {unaccepted.map((order) => (
                    <HistoryCard key={order.id} order={order} tab={'unaccepted'} setUnaccepted={setUnaccepted} setRejected={setRejected}/>
                  ))}
                  {completed.map((order) => (
                    <HistoryCard key={order.id} order={order} tab={'completed'} />
                  ))}
                  {rejected.map((order) => (
                    <HistoryCard key={order.id} order={order} tab={'rejected'} />
                  ))}
                </>
              )}
              {Tab === 'pending' && pending.map((order) => (
                <HistoryCard key={order.id} order={order} tab = {'pending'} setPending={setPending} setCompleted={setCompleted} setRejected={setRejected}/>
              ))}
              {Tab === 'unaccepted' && unaccepted.map((order) => (
                <HistoryCard key={order.id} order={order}  tab ={'unaccepted'} setUnaccepted={setUnaccepted}  setRejected={setRejected}/>
              ))}
              {Tab === 'completed' && completed.map((order) => (
                <HistoryCard key={order.id} order={order}  tab = {'completed'}/>
              ))}
              {Tab === 'rejected' && rejected.map((order) => (
                <HistoryCard key={order.id} order={order}  tab = {'rejected'}/>
              ))}
              {Tab === 'partialcompleted' && partialCompleted.map((order) => (
                <HistoryCard key={order.id} order={order}  tab = {'partialcompleted'} setpartialCompleted={setpartialCompleted} setCompleted={setCompleted}/>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default History;
