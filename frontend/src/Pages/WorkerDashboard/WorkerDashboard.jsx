import './WorkerDashboard.css';

import NewNavbar from "../../Components/NewNavbar/NewTradesmanNavbar.jsx";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const WorkerDashboard = () => {

        const [seeDetail, setSeeDetail] = useState({});
        const [ClickedButton, setClickedButton] = useState({
                profile: true,
                acceptedTask: false,
                availableTask: false,
                completedTask: false,
                feedback: false
        });

        const handleSeeDetail = (taskId) => {
                setSeeDetail(prevState => ({
                        ...prevState,
                        [taskId]: !prevState[taskId]
                }));
        }

        const calculateAge = (date) => {
                const birthDate = new Date(date);
                const ageDifMs = Date.now() - birthDate.getTime();
                const ageDate = new Date(ageDifMs);
                return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        const handleClickedButton = (buttonName) => {
                setClickedButton(prevState => ({
                        ...prevState,
                        profile: false,
                        acceptedTask: false,
                        availableTask: false,
                        completedTask: false,
                        [buttonName]: true
                }));
        }

        return(
                <>
                        <NewNavbar />
                        <ToastContainer/>
                        <div className="WorkerDashboard">
                                <div className="left-panel">
                                        <div className="profile">
                                                <img src="" alt="profile" />
                                                <h3>John Doe</h3>
                                                <p>Tradesman</p>
                                        </div>
                                        <div className="options">
                                                <p onClick = {() => {handleClickedButton('profile')}}>Profile</p>
                                                <p onClick = {() => {handleClickedButton('acceptedTask')}}>Accepted Task</p>
                                                <p onClick = {() => {handleClickedButton('availableTask')}}>Available Task</p>
                                                <p onClick = {() => {handleClickedButton('completedTask')}}>Completed Task</p>
                                        </div>
                                </div>
                                <div className="right-panel">
                                        {ClickedButton['profile'] && <div className="profile">
                                                <h2>Hi John !</h2>
                                                <h3>Welcome to your profile section</h3>
                                                <div className="worker-detail">
                                                        <b>Full Name</b>
                                                        <p>John Doe</p>
                                                </div>
                                                <div className="worker-detail">
                                                        <b>Email</b>
                                                        <p>faltu@gmail.com</p>
                                                </div>
                                                <div className="worker-detail">
                                                        <b>Phone Number</b>
                                                        <p>1234567890</p>
                                                </div>
                                                <div className="worker-detail">
                                                        <b>Address</b>
                                                        <p>123, ABC Street, XYZ City</p>
                                                </div>
                                                <div className="worker-detail">
                                                        <b>Date of Birth</b>
                                                        <p>01/01/1990</p>
                                                </div>
                                                <div className="worker-detail">
                                                        <b>Age</b>
                                                        <p>{calculateAge('01-01-1990')}</p>
                                                </div>
                                                <div className="worker-detail">
                                                        <b>Aadhar Card Number</b>
                                                        <p>1234 5678 1234</p>
                                                </div>
                                                <div className="worker-detail">
                                                        <b>Experience</b>
                                                        <p>5 years</p>
                                                </div>
                                                <div className="worker-detail">
                                                        <b>Skills</b>
                                                        <p>Electrician</p>
                                                </div>
                                                <div className="worker-detail">
                                                        <b>Rating</b>
                                                        <p>4.5 &#127775;</p>
                                                </div>
                                        </div>}
                                        {ClickedButton['acceptedTask'] && <div className="accepted-task">
                                                <h2>Accepted Task</h2>
                                                <div className="Task-Card">
                                                        <div className="task-details">
                                                                <h3>Customer Name</h3>
                                                                <p>Location</p>
                                                                <p>Task Type</p>
                                                                <p>Task Date</p>
                                                                <button onClick = {() => {handleSeeDetail(1)}}>{(seeDetail[1]) ? 'Close Detail' : 'See Detail'}</button>
                                                                <button>Complete</button>
                                                        </div>
                                                        {seeDetail[1] && <div className="Task-description">
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, consectetur autem unde dignissimos debitis commodi. Dolorem, quasi inventore dicta at sequi ab cum corrupti. Veniam, quisquam. Maiores odio itaque laborum.
                                                        </div>}
                                                </div>

                                        </div>}


                                        {ClickedButton['availableTask'] && <div className="available-task">
                                                <h2>Available Task</h2>
                                                <div className="Task-Card">
                                                        <div className="task-details">
                                                                <h3>Customer Name</h3>
                                                                <p>Location</p>
                                                                <p>Task Type</p>
                                                                <p>Task Date</p>
                                                                <button onClick = {() => {handleSeeDetail(1)}}>{(seeDetail[1]) ? 'Close Detail' : 'See Detail'}</button>
                                                                <button>Accept</button>
                                                                <button>Reject</button>
                                                        </div>
                                                        {seeDetail[1] && <div className="Task-description">
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, consectetur autem unde dignissimos debitis commodi. Dolorem, quasi inventore dicta at sequi ab cum corrupti. Veniam, quisquam. Maiores odio itaque laborum.
                                                        </div>}
                                                </div>
                                        </div>}


                                        {ClickedButton['completedTask'] && <div className="completed-task">
                                                <h2>Completed Task</h2>
                                                <div className="Task-Card">
                                                        <div className="task-details">
                                                                <h3>Customer Name</h3>
                                                                <p>Location</p>
                                                                <p>Task Type</p>
                                                                <p>Task Date</p>
                                                                <button onClick = {() => {handleSeeDetail(1)}}>{(seeDetail[1]) ? 'Close Detail' : 'See Detail'}</button>
                                                        </div>
                                                        {seeDetail[1] && <div className="Task-description">
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, consectetur autem unde dignissimos debitis commodi. Dolorem, quasi inventore dicta at sequi ab cum corrupti. Veniam, quisquam. Maiores odio itaque laborum.
                                                        </div>}
                                                </div>
                                        </div>}
                                </div>
                        </div>
                        <Footer />
                </>
        );
}
export default WorkerDashboard;