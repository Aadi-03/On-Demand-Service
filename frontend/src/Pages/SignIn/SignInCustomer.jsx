import "./SignIn.css";
import "./SignInCustomer.css";

const SignInCustomer = () => {
  return (
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
  );
};
export default SignInCustomer;
