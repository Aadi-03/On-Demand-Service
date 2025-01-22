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
import axios from "axios";

const UserDashboard = () => {
  const marks = [
    {
      value: 10,
      label: "1km",
    },
    {
      value: 20,
      label: "2km",
    },
    {
      value: 50,
      label: "5km",
    },
    {
      value: 100,
      label: "10km",
    },
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

  const [providerData, setProviderData] = useState([]);
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
  return (
    <>
      <Navbar />
      <div className="user-dashboard">
        <div className="left">
          <p>Filters</p>
          <form action="">
            <div className="filtertype">
              <h2>Services</h2>
              <div className="option">
                <label htmlFor="electrician">Electrician</label>
                <input type="checkbox" name="service" id="electrician" />
              </div>

              <div className="option">
                <label htmlFor="plumber">Plumber</label>
                <input type="checkbox" name="service" id="plumber" />
              </div>

              <div className="option">
                <label htmlFor="carpenter">Carpenter</label>
                <input type="checkbox" name="service" id="carpenter" />
              </div>

              <div className="option">
                <label htmlFor="painter">Painter</label>
                <input type="checkbox" name="service" id="painter" />
              </div>
            </div>

            <div className="filtertype">
              <h2>Rating (atleast)</h2>
              <div className="option">
                <label htmlFor="5">
                  <Rating
                    name="half-rating-read"
                    defaultValue={5}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                </label>
                <input type="radio" name="rating" id="5" />
              </div>

              <div className="option">
                <label htmlFor="4">
                  <Rating
                    name="half-rating-read"
                    defaultValue={4}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                </label>
                <input type="radio" name="rating" id="4" />
              </div>

              <div className="option">
                <label htmlFor="3">
                  <Rating
                    name="half-rating-read"
                    defaultValue={3}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                </label>
                <input type="radio" name="rating" id="3" />
              </div>

              <div className="option">
                <label htmlFor="2">
                  <Rating
                    name="half-rating-read"
                    defaultValue={2}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                </label>
                <input type="radio" name="rating" id="2" />
              </div>

              <div className="option">
                <label htmlFor="1">
                  <Rating
                    name="half-rating-read"
                    defaultValue={1}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                </label>
                <input type="radio" name="rating" id="1" />
              </div>
            </div>

            <div className="filtertype">
              <h2>Radius</h2>
              <Slider
                aria-label="Restricted values"
                defaultValue={1}
                getAriaValueText={valuetext}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </div>

            <button type="submit">Apply Filters</button>
          </form>
        </div>
        <div className="center">
          <div className="heading">Results for Search</div>

          <div className="card-container">
            {providerData.map((provider, index) => (
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
            ))}
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
