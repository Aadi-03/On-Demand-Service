import "./WorkerDashboard.css";

import NewNavbar from "../../Components/NewNavbar/NewTradesmanNavbar.jsx";
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import available from "../../assets/available.png";
import unavailable from "../../assets/unavailable.png";

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

  const [tasks, setTasks] = useState();
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSeeDetail = (taskId) => {
    setSeeDetail((prevState) => {
        return {
            [taskId]: !prevState[taskId] || false 
        };
    });
};

  const calculateAge = (date) => {
    const birthDate = new Date(date);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleClickedButton = async (buttonName) => {
    setClickedButton((prevState) => ({
      ...prevState,
      profile: false,
      acceptedTask: false,
      availableTask: false,
      completedTask: false,
      [buttonName]: true,
    }));
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/provider/auth/${buttonName}`,
      headers: {
        Authorization: `bearer ${localStorage.getItem("providerToken")}`,
      },
    };
    try {
      let result = await axios.request(config);
      setTasks(result.data);
      // console.log(result.data);
    } catch (err) {
      console.log(err);
    }
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
          if (location.state?.info) {
            toast.info(location.state.info, {
              autoClose: 3000,
            });
            window.history.replaceState({}, document.title);
          }
          if (location.state?.success) {
            toast.success(location.state.success, {
              autoClose: 3000,
            });
            window.history.replaceState({}, document.title);
          }
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
      <ToastContainer position="bottom-right" />
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
                handleClickedButton("availableTask");
              }}
            >
              Available Task
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
              <div className="status-container">
                <h2>Hi {profileData.firstName} !</h2>
                <select
                  className="status"
                  value={profileData.available ? "available" : "unavailable"}
                  onChange={(e) => {
                    const newStatus = e.target.value === "available";

                    // Update local state immediately for better UX
                    setProfileData({ ...profileData, available: newStatus });

                    // Prepare API request data
                    let data = JSON.stringify({
                      available: newStatus,
                    });

                    let config = {
                      method: "patch",
                      maxBodyLength: Infinity,
                      url: "http://localhost:3000/provider/auth/updateStatus",
                      headers: {
                        Authorization: `bearer ${localStorage.getItem(
                          "providerToken"
                        )}`,
                        "Content-Type": "application/json",
                      },
                      data: data,
                    };

                    // Make the API request
                    axios
                      .request(config)
                      .then((response) => {
                        toast.success(
                          `Status updated to ${
                            newStatus ? "Available" : "Unavailable"
                          }`
                        );
                        console.log(response.data);
                      })
                      .catch((error) => {
                        console.error(error);
                        // Revert the UI change if the API call fails
                        setProfileData({
                          ...profileData,
                          available: !newStatus,
                        });
                        toast.error("Failed to update status");
                      });
                  }}
                >
                  <option value="available" className="available">
                    Available
                  </option>
                  <option value="unavailable" className="unavailable">
                    Unavailable
                  </option>
                </select>
              </div>
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
              {tasks?.acceptedTask?.map((task) => {
                return (
                  <div className="Task-Card">
                    <div className="task-details">
                      <h3>
                        {task?.askedBy?.firstName} {task?.askedBy?.lastName}
                      </h3>
                      <p>
                        {task?.askedBy?.address?.houseNumber}{" "}
                        {task?.askedBy?.address?.streetName}{" "}
                        {task?.askedBy?.address?.state}{" "}
                        {task?.askedBy?.address?.country}
                      </p>
                      <p>{task?.taskName}</p>
                      <p>{formatDate(task?.updatedAt)}</p>
                      <button
                        onClick={() => {
                          setValue(task.id);
                          handleSeeDetail(task.id);
                        }}
                      >
                        {seeDetail[value] && value == task.id
                          ? "Close Detail"
                          : "See Detail"}
                      </button>

                      <button
                        onClick={() => {
                          let data = JSON.stringify({
                            orderId: task.id,
                          });

                          let config = {
                            method: "patch",
                            maxBodyLength: Infinity,
                            url: "http://localhost:3000/provider/auth/completeOrder",
                            headers: {
                              Authorization:
                                "bearer " +
                                localStorage.getItem("providerToken"),
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
                                toast.success(
                                  "Task " +
                                    task.taskName +
                                    " Completed Successfully"
                                );
                                setTasks((prevTasks) => ({
                                  ...prevTasks,
                                  acceptedTask: prevTasks.acceptedTask.filter(
                                    (t) => t.id !== task.id
                                  ),
                                }));
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          }

                          makeRequest();
                        }}
                      >
                        Complete
                      </button>
                    </div>
                    {seeDetail[value] && value == task.id && (
                      <div className="Task-description">
                        {task?.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {ClickedButton["availableTask"] && (
            <div className="available-task">
              <h2>Available Task</h2>
              {tasks?.availableTask?.map((task) => {
                return (
                  <div className="Task-Card">
                    <div className="task-details">
                      <h3>
                        {task?.askedBy?.firstName} {task?.askedBy?.lastName}
                      </h3>
                      <p>
                        {task?.askedBy?.address?.houseNumber}{" "}
                        {task?.askedBy?.address?.streetName}{" "}
                        {task?.askedBy?.address?.state}{" "}
                        {task?.askedBy?.address?.country}
                      </p>
                      <p>{task?.taskName}</p>
                      <p>{formatDate(task?.updatedAt)}</p>
                      <button
                        onClick={() => {
                          setValue(task.id);
                          handleSeeDetail(task.id);
                        }}
                      >
                        {seeDetail[value] && value == task.id
                          ? "Close Detail"
                          : "See Detail"}
                      </button>
                      <button
                        onClick={() => {
                          let data = JSON.stringify({
                            orderId: task.id,
                          });

                          let config = {
                            method: "patch",
                            maxBodyLength: Infinity,
                            url: "http://localhost:3000/provider/auth/acceptOrder",
                            headers: {
                              Authorization:
                                "bearer " +
                                localStorage.getItem("providerToken"),
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
                                toast.success(
                                  "Task " +
                                    task.taskName +
                                    " Accepted Successfully"
                                );
                                setTasks((prevTasks) => ({
                                  ...prevTasks,
                                  availableTask: prevTasks.availableTask.filter(
                                    (t) => t.id !== task.id
                                  ),
                                }));
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          }

                          makeRequest();
                        }}
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => {
                          let data = JSON.stringify({
                            orderId: task.id,
                          });

                          let config = {
                            method: "patch",
                            maxBodyLength: Infinity,
                            url: "http://localhost:3000/provider/auth/rejectOrder",
                            headers: {
                              Authorization:
                                "bearer " +
                                localStorage.getItem("providerToken"),
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
                                toast.success(
                                  "Task " +
                                    task.taskName +
                                    " Rejected Successfully"
                                );
                                setTasks((prevTasks) => ({
                                  ...prevTasks,
                                  availableTask: prevTasks.availableTask.filter(
                                    (t) => t.id !== task.id
                                  ),
                                }));
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          }

                          makeRequest();
                        }}
                      >
                        Reject
                      </button>
                    </div>
                    {seeDetail[value] && value == task?.id && (
                      <div className="Task-description">
                        {task?.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {ClickedButton["completedTask"] && (
            <div className="completed-task">
              <h2>Completed Task</h2>
              {tasks?.completedTask?.map((task) => {
                return (
                  <div className="Task-Card">
                    <div className="task-details">
                      <h3>
                        {task?.askedBy?.firstName} {task?.askedBy?.lastName}
                      </h3>
                      <p>
                        {task?.askedBy?.address?.houseNumber}{" "}
                        {task?.askedBy?.address?.streetName}{" "}
                        {task?.askedBy?.address?.state}{" "}
                        {task?.askedBy?.address?.country}
                      </p>
                      <p>{task?.taskName}</p>
                      <p>{formatDate(task?.updatedAt)}</p>
                      <button
                        onClick={()=>{
                         
                        }}>
                          ReDo
                      </button>
                      <button
                        onClick={() => {
                          setValue(task?.id);
                          handleSeeDetail(task?.id);
                        }}
                      >
                        {seeDetail[value] && value == task?.id
                          ? "Close Detail"
                          : "See Detail"}
                      </button>
                    </div>
                    {seeDetail[value] && value == task?.id && (
                      <div className="Task-description">
                        {task?.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default WorkerDashboard;
