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
  const [loading, setLoading] = useState(true);
  
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
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    makeRequest();
  }, []);

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
  
  // Skeleton loader component for provider cards
  const SkeletonCard = () => (
    <div className="bookmark-container">
      <div className="provider-complete-card-holder">
        <div className="provider-card-container">
          <div className="card skeleton-card">
            <div className="image skeleton-image"></div>
            <div className="details">
              <div className="name-age">
                <span className="name skeleton-text"></span>
                <span className="age skeleton-text skeleton-small"></span>
              </div>
              <div className="distance skeleton-text skeleton-small"></div>
              <div className="type">
                <span className="skeleton-text"></span>
                <span className="skeleton-text skeleton-rating"></span>
              </div>
            </div>
            <div className="call skeleton-button"></div>
          </div>
          <div className="select-worker skeleton-button"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <NewCustomerNavbar 
        setProviderData={setProviderData} 
        fav={true} 
        setLoading={setLoading} 
      />
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
      <div className="favorites">
        <div className="heading">Favorites</div>
        <div className="card-container">
          {loading ? (
            // Show skeleton cards while loading
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : providerData.length > 0 ? (
            providerData.map((provider, index) => (
              <div className="bookmark-container" key={index}>
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
                <Card
                  providerId={provider.providerId}
                  name={provider.providerName}
                  age={provider.providerAge}
                  distance={provider.providerDistanceInKm}
                  workType={provider.providerWorkType}
                  rating={provider.providerRating}
                  phoneNo={provider.providerPhone}
                  status = {provider.providerStatus}
                  onClick={() => handleCardClick(provider)}
                />
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
