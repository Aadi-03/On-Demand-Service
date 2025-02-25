import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignIn from "./Pages/SignIn/SignIn.jsx";
import SignInCustomer from "./Pages/SignIn/SignInCustomer.jsx";
import SignInTradesman from "./Pages/SignIn/SignInTradesman.jsx";

import SignUp from "./Pages/SignUp/SignUp.jsx";
import SignUpCustomer from "./Pages/SignUp/SignUpCustomer.jsx";
import SignUpTradesman from "./Pages/SignUp/SignUpTradesman.jsx";

import UserDashboard from "./Pages/UserDashboard/UserDashboard.jsx";
import WorkerDashboard from "./Pages/WorkerDashboard/WorkerDashboard.jsx";

import History from "./Pages/History/History.jsx";


import Favorites from "./Pages/Favorites/Favorites.jsx";
import CustomerProfile from "./Pages/Profile/Profile.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  { path: "/signupcustomer", 
    element: <SignUpCustomer /> 
  },
  {
    path: "/signuptradesman",
    element: <SignUpTradesman />,
  },
  { path: "/signup", 
    element: <SignUp /> 
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  { path: "/signincustomer", 
    element: <SignInCustomer /> 
  },
  {
    path: "/signintradesman",
    element: <SignInTradesman />,
  },
  {
    path: "/customer/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/customer/dashboard/history",
    element: <History />,
  },
  {
    path : "/customer/dashboard/favorites",
    element: <Favorites />
  },
  {
    path : "/customer/dashboard/profile",
    element: <CustomerProfile />
  },

  {
    path : "/provider/dashboard",
    element: <WorkerDashboard />
  }
]);

const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
};

export default App;
