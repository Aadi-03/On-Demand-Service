import "./UserDashboard.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Card from "../../Components/Card/Card";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useEffect } from "react";

import NewCustomerNavbar from '../../Components/NewNavbar/NewCustomerNavbar.jsx';

import axios from "axios";

const UserDashboard = () => {
  const [providerData, setProviderData] = useState([]);
  const [filters, setFilters] = useState({
    workType: [],
    rating: 0, 
    distance: 1, 
  });
  const handleServiceChange = (e) => {
    const service = e.target.id;
    setFilters((prev) => {
      const newWorkType = prev.workType.includes(service)
        ? prev.workType.filter((s) => s !== service) 
        : [...prev.workType, service]; 
      return { ...prev, workType: newWorkType };
    });
  };

  const handleRatingChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      rating: parseInt(e.target.id, 10), 
    }));
  };

  const handleDistanceChange = (event, value) => {
    setFilters((prev) => ({
      ...prev,
      distance: value == 15 ? 1000 : value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters);
    const url = `http://localhost:3000/customer/auth/filterprovider?workType=${filters.workType}&distance=${filters.distance}&rating=${filters.rating}`;
    console.log(url);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `bearer ${localStorage.getItem("customerToken")}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        // console.log(JSON.stringify(response.data));
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setProviderData(response.data.provider);
          // console.log(providerData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };
  const marks = [
    { value: 1, label: "1 km" },
    { value: 5, label: "5 km" },
    { value: 10, label: "10 km" },
    { value: 15, label: ">10 km" },
  ];
  function valuetext(value) {
    return `${value}km`;
  }
  const [firsttimeclick, setfirsttimeclick] = useState(false);
  const [cardData, setCardData] = useState({});

  const handleCardClick = (data) => {
    setfirsttimeclick(true);

    setCardData(data);
    // console.log(data);
  };

  useEffect(() => {
    // console.log(localStorage.getItem("customerToken"));

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/customer/auth/bulkprovider",
      headers: {
        Authorization: `bearer ${localStorage.getItem("customerToken")}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        // console.log(JSON.stringify(response.data));
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setProviderData(response.data.provider);
          // console.log(providerData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);
  useEffect(() => {
    if (!providerData.length && firsttimeclick) {
      setfirsttimeclick(false);
    }
  }, [providerData, firsttimeclick]);
  return (
    <>
      {/* <Navbar /> */}
      <NewCustomerNavbar/>
      <div className="user-dashboard">
        <div className="left">
          <p>Filters</p>
          <form onSubmit={handleSubmit}>
            {/* Services Filter */}
            <div className="filtertype">
              <h2>Services</h2>
              {["Electrician", "Plumber", "Carpenter", "Mechanic"].map(
                (service) => (
                  <div className="option" key={service}>
                    <label htmlFor={service}>
                      {service.charAt(0).toUpperCase() + service.slice(1)}
                    </label>
                    <input
                      type="checkbox"
                      id={service}
                      onChange={handleServiceChange}
                      checked={filters.workType.includes(service)}
                    />
                  </div>
                )
              )}
            </div>

            {/* Rating Filter */}
            <div className="filtertype">
              <h2>Rating (at least)</h2>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div className="option" key={rating}>
                  <label htmlFor={rating}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                  </label>
                  <input
                    type="radio"
                    name="rating"
                    id={rating.toString()}
                    onChange={handleRatingChange}
                    checked={filters.rating === rating}
                  />
                </div>
              ))}
            </div>

            {/* Radius Filter */}
            <div className="filtertype">
              <h2>Radius</h2>
              <Slider
                aria-label="Restricted values"
                value={filters.distance}
                onChange={handleDistanceChange}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
                min={0}
                max={15}
              />
            </div>

            <button type="submit">Apply Filters</button>
          </form>
        </div>
        <div className="center">
          <div className="heading">Results for Search</div>

          <div className="card-container">
            {providerData.length > 0 ? (
              providerData.map((provider, index) => (
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
              ))
            ) : (
              <p>No providers found</p>
            )}
          </div>
        </div>
        {firsttimeclick && (
          <RightComponent
            name={cardData.providerName}
            address={cardData.providerAddress}
            email={cardData.providerEmail}
            workType={cardData.providerWorkType}
            rating={cardData.providerRating}
            phoneNo={cardData.providerPhone}
            feedback={cardData.providerFeedback}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

const RightComponent = ({
  name,
  address,
  email,
  workType,
  rating,
  phoneNo,
  feedback,
}) => {
  return (
    <div className="right">
      <div className="details">
        <img src="" alt="" />
        <p className="Name">{name}</p>

        <div className="details-container">
          <div className="detail-type">
            <h1>Contact Information</h1>
            <div className="detail">
              <p className="detail-heading">Email : </p>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="detail">
              <p className="detail-heading">Phone : </p>
              <a href={`tel:${phoneNo}`}>{phoneNo}</a>
            </div>

            <div className="detail">
              <p className="detail-heading">Address : </p>
              <p>{address}</p>
            </div>
          </div>
          <div className="detail-type">
            <h1>Professional Information</h1>
            <div className="detail">
              <p className="detail-heading">Service : </p>
              <p>{workType}</p>
            </div>
            <div className="detail">
              <p className="detail-heading">Experience : </p>
              <p>5 years</p>
            </div>
            <div className="detail">
              <p className="detail-heading">Rating : </p>
              <p>{rating} &#127775;</p>
            </div>
          </div>

          <div className="detail-type">
            <h1>Reviews & Feedbacks</h1>

            {feedback.length > 0 ? (
              feedback.map((feedback, index) => (
                <Feedbacks
                  key={feedback.id || index}
                  feedback={feedback.feedback}
                  index={index}
                />
              ))
            ) : (
              <p>No feedbacks available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Feedbacks = ({ feedback, index }) => {
  return (
    <div className="detail">
      <p className="detail-heading">Review {index + 1} : </p>
      <p>{feedback}</p>
    </div>
  );
};

export default UserDashboard;
