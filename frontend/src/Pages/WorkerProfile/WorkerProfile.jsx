import React from "react";
import NewTradesmanNavbar from "../../Components/NewNavbar/NewTradesmanNavbar";
import { useState , useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import "./WorkerProfile.css";
import axios from "axios";
const WorkerProfile = () => {
  let [edit, setEdit] = useState(false);
  let [formData, setFormData] = useState({});
  let [userData,setUserData]=useState({});

  useEffect(()=>{

    async function makeRequest()
    {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:5000/provider/auth/profile",
        headers: {
          Authorization: `bearer ${localStorage.getItem("providerToken")}`,
        },
      };
      try{
        let response=await axios.request(config);
        setUserData(response.data);
        setFormData(response.data);
        // console.log(response.data);
      }
      catch(err)
      {
        console.log(err);
      }

    }

    makeRequest();

  },[])

  function handleChange(e) {
    let { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEdit() {
    setEdit(!edit);
  }

  function handleCancel(){
    setEdit(!edit);
    setFormData(userData);
  }

  return (
    <>
      <NewTradesmanNavbar />
      <div className="profile-section">
        <h1>Edit Profile</h1>
        <figure className="profile-photo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0irgjGV82yk4HfNp8xz2IZtwMVm6uzJo9KQ&s"
            alt="profile not visible"
          />
          <figcaption>{formData.firstName} {formData.lastName}</figcaption>
          <FaPencilAlt
            className="edit-icon"
            title="Edit"
            onClick={handleEdit}
          />
        </figure>
        <form>
          <div className="name-wrapper">
            <label>First Name: </label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={handleChange}
              readOnly={!edit}
            />

            <label>Last Name: </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleChange}
              readOnly={!edit}
            />
          </div>
          <div className="dob-wrapper">
            <label>Date Of Birth: </label>

            <input
              type="date"
              name="dob"
              value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ""}
              placeholder="YYYY-MM-DD"
              required
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              onChange={handleChange}
              readOnly={!edit}
            />
          </div>
          <div className="phonenumber-wrapper">
            <label>Mobile No.: </label>

            <input
              type="text"
              name="phoneNumber"
              placeholder="mobile no."
              value={formData.phoneNumber}
              onChange={handleChange}
              readOnly={!edit}
            />
          </div>
          <div className="address-wrapper">
            <label>House Number: </label>
          
              <input
                type="text"
                name="houseNumber"
                value={formData?.address?.houseNumber}
                placeholder="House number"
                onChange={handleChange}
                readOnly={!edit}
              />
          
            <label>Street Name: </label>
            <div className="streetname-wrapper">
              <input
                type="text"
                name="streetName"
                value={formData?.address?.streetName}
                placeholder="Street name"
                onChange={handleChange}
                readOnly={!edit}
              />
            </div>
            <div className="state-wrapper">
              <label>State: </label>
              <select name="state" onChange={handleChange} value={formData?.address?.state} disabled={!edit}>
                <option value="">Select state</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>

            <label>PinCode : </label>
            <div className="pincode-wrapper">
              <input
                type="text"
                name="pincode"
                value={formData?.address?.pincode}
                onChange={handleChange}
                readOnly={!edit}
              />
            </div>
            <label>Country: </label>
            <input type="text" name="country" value="India" readOnly />
          </div>
          <div className="gender-wrapper">
            <label>Gender: </label>
            <select name="gender" onChange={handleChange} value={formData.gender} disabled={!edit}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Prefer not to say</option>
            </select>
          </div>
          <div className="worktype-wrapper">
            <label>Work Type :</label>
            <select name="workType" onChange={handleChange} value={formData?.workType} disabled={!edit}>
              <option value="Select WorkType">Select WorkType</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Plumber">Plumber</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Electrician">Electrician</option>
            </select>
          </div>
          {edit && (
            <div className="button-group">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default WorkerProfile;
