import React from 'react';
import NewCustomerNavbar from '../../Components/NewNavbar/NewCustomerNavbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import {useEffect} from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';

const History = () => {

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
    }
      catch(err)
      {
        console.log(err);
      }
    }
    fetchHistory();
  }, []);
  return (
    <>
      <NewCustomerNavbar/>
        <div>
            <h1 style={{textAlign:"center",height:"75vh"}}>History</h1>
        </div>
        <Footer/>

    </>
  );
}

export default History;
