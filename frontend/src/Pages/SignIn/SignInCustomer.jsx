import "./SignIn.css";
import "./SignInCustomer.css";


import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
const SignInCustomer = () => {
  return (
    <>
    <Navbar />
    <div className="signin-customer-wrapper">
        <div className="email-wrapper">
            <label >Email :</label>
            <input type="text" placeholder='email' />
        </div>
        <div className="password-wrapper">
            <label >Password: </label>
            <input type="text" placeholder='password' />
        </div>
        <div>
            <button>Sign In</button>
        </div>
    </div>
    <Footer />
    </>
  );
};
export default SignInCustomer;
