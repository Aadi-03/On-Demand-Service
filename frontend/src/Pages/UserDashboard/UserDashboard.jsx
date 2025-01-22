import "./UserDashboard.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Card from "../../Components/Card/Card";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Rating from "@mui/material/Rating";
import { useState } from "react";

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
  const [firsttimeclick,setfirsttimeclick]=useState(false);
  const [cardData,setCardData]=useState({});
  const handleCardClick=(data)=>{
        setfirsttimeclick(true);
        setCardData(data);
  }
  const cards = [
        { workType: "Electrician", rating: 3.7, phoneNo: 1234567890 },
        { workType: "Mechanic", rating: 4.7, phoneNo: 67890654789 },
        { workType: "Mechanic", rating: 2.7, phoneNo: 6598748629 },
        { workType: "Plumber", rating: 3.7, phoneNo: 9874587450 },
        { workType: "Painter", rating: 3.1, phoneNo: 1236985210 },
        { workType: "Carpenter", rating: 3.9, phoneNo: 3214569890 },
        { workType: "Electrician", rating: 4.2, phoneNo: 3214867890 },
      ];
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
              {/* <Box sx={{ width: 270, padding: '40px 0' }}> */}
              <Slider
                aria-label="Restricted values"
                defaultValue={1}
                getAriaValueText={valuetext}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
              />
              {/* </Box> */}
            </div>

            <button type="submit">Apply Filters</button>
          </form>
        </div>
        <div className="center">
          <div className="heading">Results for Search</div>

          <div className="card-container">
          {cards.map((card, index) => (
          <Card
            key={index} // Key for each card
            workType={card.workType}
            rating={card.rating}
            phoneNo={card.phoneNo}
            onClick={() => handleCardClick(card)} // Pass clicked card data
          />
        ))}
            
          </div>
        </div>
        {firsttimeclick && <RightComponent workType={cardData.workType} rating={cardData.rating} phoneNo={cardData.phoneNo} />}
        {/* <div className="right">
          <div className="details">
            <img src="" alt="" />
            <p className="Name">John Doe</p>

            <div className="details-container">
              <div className="detail-type">
                <h1>Contact Information</h1>
                <div className="detail">
                  <p className="detail-heading">Email : </p>
                  <a href="mailto:abc@gmail.com">abc@gmail.com</a>
                </div>
                <div className="detail">
                  <p className="detail-heading">Phone : </p>
                  <a href="tel:1234567890">1234567890</a>
                </div>

                <div className="detail">
                  <p className="detail-heading">Address : </p>
                  <p>123, XYZ Street, ABC City</p>
                </div>
              </div>
              <div className="detail-type">
                <h1>Professional Information</h1>
                <div className="detail">
                  <p className="detail-heading">Service : </p>
                  <p>Electrician</p>
                </div>
                <div className="detail">
                  <p className="detail-heading">Experience : </p>
                  <p>5 years</p>
                </div>
                <div className="detail">
                  <p className="detail-heading">Rating : </p>
                  <p>4.5 &#127775;</p>
                </div>
              </div>

              <div className="detail-type">
                <h1>Reviews & Feedbacks</h1>
                <div className="detail">
                  <p className="detail-heading">Review 1 : </p>
                  <p>Good service</p>
                </div>
                <div className="detail">
                  <p className="detail-heading">Review 2 : </p>
                  <p>Very professional</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <Footer />
    </>
  );
};

const RightComponent=({workType,rating,phoneNo})=>{
        return(
                <div className="right">
          <div className="details">
            <img src="" alt="" />
            <p className="Name">John Doe</p>

            <div className="details-container">
              <div className="detail-type">
                <h1>Contact Information</h1>
                <div className="detail">
                  <p className="detail-heading">Email : </p>
                  <a href="mailto:abc@gmail.com">abc@gmail.com</a>
                </div>
                <div className="detail">
                  <p className="detail-heading">Phone : </p>
                  <a href="tel:1234567890">{phoneNo}</a>
                </div>

                <div className="detail">
                  <p className="detail-heading">Address : </p>
                  <p>123, XYZ Street, ABC City</p>
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
                <div className="detail">
                  <p className="detail-heading">Review 1 : </p>
                  <p>Good service</p>
                </div>
                <div className="detail">
                  <p className="detail-heading">Review 2 : </p>
                  <p>Very professional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
}

export default UserDashboard;
