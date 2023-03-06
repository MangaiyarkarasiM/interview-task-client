import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/users";
import moment from "moment";

const Home = () => {
  let navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { user: currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const onLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div className="my-24 flex flex-col text-center">
      <h2 className="font-bold text-2xl">Welcome to the homepage</h2>
      <div className="mt-8 flex flex-col bg-white border rounded-md shadow w-3/4 md:w-1/2 mx-auto">
        <div className="mt-3 block font-medium ">
          <span className="mr-5 font-bold">First Name : </span>
          <span className=" font-medium">{currentUser.firstName} </span>
        </div>
        <div className="mt-3 block font-medium">
          <span className="mr-5 font-bold">Last Name : </span>
          <span className=" font-medium">{currentUser.lastName} </span>
        </div>
        <div className="mt-3 block font-medium">
          <span className="mr-5 font-bold">Email : </span>
          <span className=" font-medium">{currentUser.email} </span>
        </div>
        <div className="mt-3 block font-medium">
          <span className="mr-5 font-bold">Mobile : </span>
          <span className=" font-medium">{currentUser.mobile} </span>
        </div>
        <div className="mt-3 block font-medium">
          <span className="mr-5 font-bold">DOB : </span>
          <span className=" font-medium">{moment(currentUser.dob).format('DD-MM-yyyy')} </span>
        </div>
        <div className="mt-8">
          <button
            type="button"
            className="inline items-center text-white border rounded-md bg-orange-600 mb-5 px-10 py-2 hover:bg-orange-500"
            onClick={onLogout}
          >
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
