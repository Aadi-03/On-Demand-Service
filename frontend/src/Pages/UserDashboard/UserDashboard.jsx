import "./UserDashboard.css";
import * as React from "react";
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
import Card from "../../Components/Card/Card";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const UserDashboard = () => {
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
              <h2>Rating</h2>
              <div className="option">
                <label htmlFor="5">5&#127775; or more </label>
                <input type="radio" name="rating" id="5" />
              </div>

              <div className="option">
                <label htmlFor="4">4&#127775; or more </label>
                <input type="radio" name="rating" id="4" />
              </div>

              <div className="option">
                <label htmlFor="3">3&#127775; or more</label>
                <input type="radio" name="rating" id="3" />
              </div>

              <div className="option">
                <label htmlFor="2">2&#127775; or more</label>
                <input type="radio" name="rating" id="2" />
              </div>

              <div className="option">
                <label htmlFor="1">1&#127775; or more</label>
                <input type="radio" name="rating" id="1" />
              </div>
            </div>

            <div className="filtertype">
              <h2>Radius</h2>
            </div>

            <button type="submit">Apply Filters</button>
          </form>
        </div>
        <div className="center">
          <div className="heading">Results for Search</div>

          <div className="card-container">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
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
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserDashboard;
