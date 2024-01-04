/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const CreateAccountComponent = () => {
  return (
    
    <div className="bg-light-sage-green min-h-screen flex justify-center flex-col">
    <header className="bg-light-sage-green shadow-2xl h-12 p-3 font-bold">LOGO</header>
      <div className="flex-grow flex">

      <div className="flex flex-col items-center justify-center">
          <div className="m-4 py-0 flex flex-row items-center text-5xl font-black text-center">
            Register An Account
          </div>
          <div className="text-center w-9/12">
            <i>Ready to elevate your crafting experience? Join our vibrant community by registering for an account. Whether you're a seasoned carpenter, a green-thumb enthusiast, or anyone in between, ToolHub is your go-to platform for seamless tool sharing and collaborative projects. Connect with like-minded individuals, join local groups, and expand your toolbox. Sign up now and be part of ToolHub!</i>
          </div>
        </div>
        

        <div className="bg-white bg-opacity-75 p-5 m-0 flex flex-col items-center shadow-2xl h-screen w-60 ">
        <div className="text-center text-xl font-bold h-20">Join ToolHub, craft your account today!</div>
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
          <button className="bg-light-sage-green text-black  rounded-md p-1 font-bold justify-center text-xl shadow-xl hover:bg-gray-800 hover:text-white my-5 px-5">
            Register Account
          </button>
          <Link
            to="/"
            className="bg-light-sage-green text-black  rounded-md p-1 font-bold justify-center text-xl shadow-xl hover:bg-gray-800 hover:text-white mt-3 px-5"
          >
            Return To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountComponent;
