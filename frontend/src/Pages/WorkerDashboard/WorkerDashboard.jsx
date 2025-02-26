import "./WorkerDashboard.css";

import NewNavbar from "../../Components/NewNavbar/NewTradesmanNavbar.jsx";
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WorkerDashboard = () => {
  const [profileData, setProfileData] = useState({});
  const [seeDetail, setSeeDetail] = useState({});
  const [ClickedButton, setClickedButton] = useState({
    profile: true,
    acceptedTask: false,
    availableTask: false,
    completedTask: false,
    feedback: false,
  });
  const navigate = useNavigate();

  const handleSeeDetail = (taskId) => {
    setSeeDetail((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const calculateAge = (date) => {
    const birthDate = new Date(date);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleClickedButton = (buttonName) => {
    setClickedButton((prevState) => ({
      ...prevState,
      profile: false,
      acceptedTask: false,
      availableTask: false,
      completedTask: false,
      [buttonName]: true,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const maskAadharNumber = (aadhar) => {
    if (!aadhar) return "";

    // Remove any spaces or dashes if present
    const cleanAadhar = aadhar.replace(/[\s-]/g, "");

    // Make sure we have a valid length
    if (cleanAadhar.length < 4) return aadhar;

    // Return masked number (XXXX XXXX XXXX format where only last 4 digits are visible)
    const lastFour = cleanAadhar.slice(-4);
    return `XXXX XXXX ${lastFour}`;
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/provider/auth/profile",
      headers: {
        Authorization: `bearer ${localStorage.getItem("providerToken")}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        // console.log(JSON.stringify(response.data));
        if (response.data.error) {
          navigate("/signintradesman", {
            state: {
              error: response.data.error + " Please Login Again",
            },
          });
        } else {
          // toast.success("Profile Data Fetched Successfully");
          setProfileData(response.data);
        //   console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  return (
    <>
      <NewNavbar />
      <ToastContainer />
      <div className="WorkerDashboard">
        <div className="left-panel">
          <div className="profile">
            <img src="" alt="profile" />
            <h3>
              {profileData.firstName} {profileData.lastName}
            </h3>
            <p>Tradesman</p>
          </div>
          <div className="options">
            <p
              onClick={() => {
                handleClickedButton("profile");
              }}
            >
              Profile
            </p>
            <p
              onClick={() => {
                handleClickedButton("acceptedTask");
              }}
            >
              Accepted Task
            </p>
            <p
              onClick={() => {
                handleClickedButton("availableTask");
              }}
            >
              Available Task
            </p>
            <p
              onClick={() => {
                handleClickedButton("completedTask");
              }}
            >
              Completed Task
            </p>
          </div>
        </div>
        <div className="right-panel">
          {ClickedButton["profile"] && (
            <div className="profile">
              <h2>Hi {profileData.firstName} !</h2>
              <h3>Welcome to your profile section</h3>
              <div className="worker-detail">
                <b>Full Name</b>
                <p>
                  {profileData.firstName} {profileData.lastName}
                </p>
              </div>
              <div className="worker-detail">
                <b>Email</b>
                <p>{profileData.email}</p>
              </div>
              <div className="worker-detail">
                <b>Phone Number</b>
                <p>{profileData.phoneNumber}</p>
              </div>
              <div className="worker-detail">
                <b>Address</b>
                <p>
                  {profileData.address
                    ? `${profileData.address.houseNumber}, ${profileData.address.streetName}, ${profileData.address.state}, ${profileData.address.country}, ${profileData.address.pincode}`
                    : "Address loading..."}
                </p>
              </div>
              <div className="worker-detail">
                <b>Date of Birth</b>
                <p>{profileData.dob ? formatDate(profileData.dob) : ""}</p>
              </div>
              <div className="worker-detail">
                <b>Age</b>
                <p>{calculateAge(profileData.dob)}</p>
              </div>
              <div className="worker-detail">
                <b>Aadhar Card Number</b>
                <p>{maskAadharNumber(profileData.aadharNumber)}</p>
              </div>
              <div className="worker-detail">
                <b>Experience</b>
                <p>5 years</p>
              </div>
              <div className="worker-detail">
                <b>Skills</b>
                <p>{profileData.workType}</p>
              </div>
              <div className="worker-detail">
                <b>Rating</b>
                <p>{profileData.rating} &#127775;</p>
              </div>
            </div>
          )}
          {ClickedButton["acceptedTask"] && (
            <div className="accepted-task">
              <h2>Accepted Task</h2>
              <div className="Task-Card">
                <div className="task-details">
                  <h3>Customer Name</h3>
                  <p>Location</p>
                  <p>Task Type</p>
                  <p>Task Date</p>
                  <button
                    onClick={() => {
                      handleSeeDetail(1);
                    }}
                  >
                    {seeDetail[1] ? "Close Detail" : "See Detail"}
                  </button>
                  <button>Complete</button>
                </div>
                {seeDetail[1] && (
                  <div className="Task-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil, consectetur autem unde dignissimos debitis commodi.
                    Dolorem, quasi inventore dicta at sequi ab cum corrupti.
                    Veniam, quisquam. Maiores odio itaque laborum.
                  </div>
                )}
              </div>
            </div>
          )}

          {ClickedButton["availableTask"] && (
            <div className="available-task">
              <h2>Available Task</h2>
              <div className="Task-Card">
                <div className="task-details">
                  <h3>Customer Name</h3>
                  <p>Location</p>
                  <p>Task Type</p>
                  <p>Task Date</p>
                  <button
                    onClick={() => {
                      handleSeeDetail(1);
                    }}
                  >
                    {seeDetail[1] ? "Close Detail" : "See Detail"}
                  </button>
                  <button>Accept</button>
                  <button>Reject</button>
                </div>
                {seeDetail[1] && (
                  <div className="Task-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil, consectetur autem unde dignissimos debitis commodi.
                    Dolorem, quasi inventore dicta at sequi ab cum corrupti.
                    Veniam, quisquam. Maiores odio itaque laborum.
                  </div>
                )}
              </div>
            </div>
          )}

          {ClickedButton["completedTask"] && (
            <div className="completed-task">
              <h2>Completed Task</h2>
              <div className="Task-Card">
                <div className="task-details">
                  <h3>Customer Name</h3>
                  <p>Location</p>
                  <p>Task Type</p>
                  <p>Task Date</p>
                  <button
                    onClick={() => {
                      handleSeeDetail(1);
                    }}
                  >
                    {seeDetail[1] ? "Close Detail" : "See Detail"}
                  </button>
                </div>
                {seeDetail[1] && (
                  <div className="Task-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil, consectetur autem unde dignissimos debitis commodi.
                    Dolorem, quasi inventore dicta at sequi ab cum corrupti.
                    Veniam, quisquam. Maiores odio itaque laborum.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default WorkerDashboard;
