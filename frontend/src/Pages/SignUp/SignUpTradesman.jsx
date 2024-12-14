import React from "react";

const SignUpTradesman = () => {
  return (
    <div className="signup-tradesman-wrapper">
      <div className="name-wrapper">
        <label>FirstName: </label>
        <input type="text" placeholder="FirstName" />
        <label>LastName: </label>
        <input type="text" placeholder="LastName" />
      </div>
      <div className="dob-wrapper">
        <label>Date Of Birth: </label>
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          required
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        />
      </div>
      <div className="phonenumber-wrapper">
        <label>Mobile No.: </label>
        <input type="text" placeholder="mobile no." />
      </div>
      <div className="email-wrapper">
        <label>Email: </label>
        <input type="text" placeholder="email" />
      </div>
      <div className="address-wrapper">
        <label>House Number: </label>
        <input type="text" placeholder="House number" />
        <label>Street Name: </label>
        <input type="text" placeholder="Street name" />
        <label>State: </label>
        <select>
          <option value="">Select state</option>
          <option value="AN">Andaman and Nicobar Islands</option>
          <option value="AP">Andhra Pradesh</option>
          <option value="AR">Arunachal Pradesh</option>
          <option value="AS">Assam</option>
          <option value="BR">Bihar</option>
          <option value="CH">Chandigarh</option>
          <option value="CT">Chhattisgarh</option>
          <option value="DN">Dadra and Nagar Haveli</option>
          <option value="DD">Daman and Diu</option>
          <option value="DL">Delhi</option>
          <option value="GA">Goa</option>
          <option value="GJ">Gujarat</option>
          <option value="HR">Haryana</option>
          <option value="HP">Himachal Pradesh</option>
          <option value="JK">Jammu and Kashmir</option>
          <option value="JH">Jharkhand</option>
          <option value="KA">Karnataka</option>
          <option value="KL">Kerala</option>
          <option value="LA">Ladakh</option>
          <option value="LD">Lakshadweep</option>
          <option value="MP">Madhya Pradesh</option>
          <option value="MH">Maharashtra</option>
          <option value="MN">Manipur</option>
          <option value="ML">Meghalaya</option>
          <option value="MZ">Mizoram</option>
          <option value="NL">Nagaland</option>
          <option value="OR">Odisha</option>
          <option value="PY">Puducherry</option>
          <option value="PB">Punjab</option>
          <option value="RJ">Rajasthan</option>
          <option value="SK">Sikkim</option>
          <option value="TN">Tamil Nadu</option>
          <option value="TG">Telangana</option>
          <option value="TR">Tripura</option>
          <option value="UP">Uttar Pradesh</option>
          <option value="UT">Uttarakhand</option>
          <option value="WB">West Bengal</option>
        </select>
        <label>Country: </label>
        <input type="text" value="India" readOnly />
      </div>
      <div className="photo-wrapper">
        <label>Photograph: </label>
        <input type="file" accept="image/*" />
      </div>
      <div className="gender-wrapper">
        <label>Gender: </label>
        <select>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="aadhar-wrapper">
        <label >Aadhar No : </label>
        <input type="text" />
      </div>
      <div className="worktype-wrapper">
        <label >Work Type :</label>
        <select name="worktype">
            <option value="WorkType">Select WorkType</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Plumber">Plumber</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Electrician">Electrician</option>
        </select>
      </div>
      <div className="password-wrapper">
        <label>Password: </label>
        <input type="password" placeholder="Password" />
      </div>
      <div>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUpTradesman;
