/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const CreateAccountComponent = () => {
  return (
    
    <div className="bg-light-sage-green min-h-screen flex flex-col">
      <header className="flex flex-col bg-light-sage-green z-20 shadow-2xl">LOGO</header>

      <div className="flex-grow flex flex-row justify-between">

        <div className="m-4 py-0 flex flex-row text-5xl font-black items-center text-center w-9/12">
          Register An Account
        </div>

        <div className="flex-grow bg-white bg-opacity-80 p-5 flex flex-col items-center justify-center shadow-2xl">
        <form className="p-4 ">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              defaultValue=""
              placeholder="First Name"
              className="z-10 bg-white border border-black rounded-md p-1 text-black placeholder-slate-400 shadow-lg hover:bg-gray-100"
            />
          </form>
          <form className="p-4 ">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue=""
              placeholder="Last Name"
              className="bg-white border border-black rounded-md p-1 text-black placeholder-slate-400 shadow-lg hover:bg-gray-100"
            />
          </form>
          <form className="p-4">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue=""
              placeholder="example@email.com"
              className="bg-white border border-black rounded-md p-1 placeholder-slate-400 text-black shadow-lg hover:bg-gray-100"
            />
          </form>
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
          <form className="p-4 ">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="text"
              id="password"
              name="confirm-password"
              defaultValue=""
              placeholder="confirm password"
              className="bg-white border border-black rounded-md p-1 text-black placeholder-slate-400 shadow-lg hover:bg-gray-100"
            />
          </form>
          <div></div>
          <button className="bg-light-sage-green text-black  rounded-md p-1 font-bold justify-center text-xl shadow-xl hover:bg-gray-800 hover:text-white m-4">
            Register Account
          </button>
          <Link
            to="/"
            className="bg-light-sage-green text-black  rounded-md p-1 font-bold justify-center text-xl shadow-xl hover:bg-gray-800 hover:text-white"
          >
            Return To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountComponent;
