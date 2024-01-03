/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const WelcomeComponent = () => {
  return (
    <div className="bg-light-sage-green min-h-screen flex justify-center flex-row">
      <div className="flex w-80%">
        <div className="flex flex-col items-center justify-center">
          <div className="m-4 py-0 flex flex-row items-center text-5xl font-black">
            Welcome
          </div>
          <div className="text-center w-9/12">
            Welcome to ToolHub, your community-centric platform for sharing and
            collaborating on tools. Join groups based on your location and trade
            to connect with like-minded individuals. From carpentry to
            gardening, ToolHub facilitates seamless tool sharing, making your
            projects easier. Join us, and let's expand your toolbox together at
            ToolHub – where community meets craftsmanship!
          </div>
        </div>
        <div className="bg-white bg-opacity-80 p-5 flex flex-col items-center justify-center shadow-2xl">
          <form className="p-4">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue=""
              placeholder="username"
              className="bg-white border border-black rounded-md p-1 placeholder-slate-400 text-black shadow-lg hover:bg-gray-100"
            />
          </form>
          <form className="p-4 ">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              defaultValue=""
              placeholder="password"
              className="bg-white border border-black rounded-md p-1 text-black placeholder-slate-400 shadow-lg hover:bg-gray-100"
            />
          </form>
          <div>
            <button className="bg-light-sage-green text-black rounded-md p-1 font-bold text-2xl shadow-xl hover:bg-gray-800 hover:text-white my-5">
              Sign In
            </button>
          </div>
          <div>
            <Link
              to="/create-account"
              className=" text-blue-500  rounded-md p-1 font-bold justify-center text-m hover:text-white pt-4"
            >
              <hr />
              <i>Or Register New Account</i>
              <hr />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;
