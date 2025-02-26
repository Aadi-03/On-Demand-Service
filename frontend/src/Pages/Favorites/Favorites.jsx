import "./Favorites.css";
import * as React from "react";
import Card from "../../Components/Card/Card";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import NewCustomerNavbar from "../../Components/NewNavbar/NewCustomerNavbar.jsx";
import bookmark from "../../assets/bookmark.png";
import bookmarked from "../../assets/bookmarked.png";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const Favorites = () => {
  const [providerData, setProviderData] = useState([]);
    const [descriptionComponent, setdescriptionComponent] = useState({
      0 : false,
      1 : false,
      2 : false,
      3 : false,
      4 : false,
      5 : false,
      6 : false,
      7 : false,
      8 : false,
      9 : false,
      10 : false,
      11 : false,
      12 : false
    });
  useEffect(() => {
    // console.log(localStorage.getItem("customerToken"));

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/customer/auth/favoriteprovider",
      headers: {
        Authorization: `bearer ${localStorage.getItem("customerToken")}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        // console.log(JSON.stringify(response.data));
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setProviderData(response.data.favorite);
        }
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  const handleServiceRequest = (key) => {
    // console.log(key)
    setdescriptionComponent((prev) => {
      return {
        ...prev,
        [key]: !prev[key]
      }
    });
  };

  const handleRemoveBookmard = (id, name) => {
    let data = JSON.stringify({
      providerId: id,
    });

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/customer/auth/favoriteprovider",
      headers: {
        Authorization: "bearer " + localStorage.getItem("customerToken"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        // console.log(JSON.stringify(response.data));
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          let newProviderData = providerData.filter(
            (provider) => provider.providerId !== id
          );
          setProviderData(newProviderData);
          toast.success(`${name} removed from favorites`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  return (
    <>
      <NewCustomerNavbar setProviderData={setProviderData} fav={true} />
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
      <div className="favorites">
        <div className="heading">Favorites</div>
        <div className="card-container">
          {providerData.length > 0 ? (
            providerData.map((provider, index) => (
              <div className="bookmark-container">
                <img
                  src={bookmarked}
                  alt=""
                  className="bookmark"
                  onClick={() =>
                    handleRemoveBookmard(
                      provider.providerId,
                      provider.providerName
                    )
                  }
                />
                <div className="provider-complete-card-holder">
                  <div className="provider-card-container">
                    <Card
                      key={index}
                      id={provider.providerId}
                      name={provider.providerName}
                      age={provider.providerAge}
                      distance={provider.providerDistanceInKm}
                      workType={provider.providerWorkType}
                      rating={provider.providerRating}
                      phoneNo={provider.providerPhone}
                      onClick={() => handleCardClick(provider)}
                    />
                    <button className="select-worker" onClick={() => { handleServiceRequest(index) }}>Request Service</button>
                  </div>

                  { descriptionComponent[index] &&
                    <div className="descriptionComponent">
                      <div className="description-container">
                        <h3>Enter Description of Task</h3>
                        <form action="" className="description-form">
                          <input type="text" placeholder="Enter the title" />
                          <textarea placeholder="Enter Description" name="" id="" cols="30" rows="10"></textarea>
                          <button type="submit">Submit</button>
                        </form>
                        <button className="close-button" onClick={() => { handleServiceRequest(index) }}>Close</button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            ))
          ) : (
            <p>No providers found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Favorites;
