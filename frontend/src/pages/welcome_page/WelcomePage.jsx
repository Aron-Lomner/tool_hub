/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
const WelcomePage = () => {
  const [login, isLogin] = useState(true);
  const toggleLogin = () => {
    isLogin(!login);
  };
  return (
    <div className="bg-light-sage-green min-h-screen flex flex-col">
      <header className="bg-light-sage-green shadow-2xl h-12 p-3 font-bold m-0">
        LOGO
      </header>
      <div className="flex flex-grow flex-wrap">
        <AboutUsComponent />
        {login ? (
          <LoginComponent toggleLogin={toggleLogin} />
        ) : (
          <RegisterComponent toggleLogin={toggleLogin} />
        )}
      </div>
    </div>
  );
};

export default WelcomePage;

const AboutUsComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[50vw]">
      <div className="m-4 py-0 flex flex-row items-center text-5xl font-black">
        Welcome
      </div>
      <div className="text-center px-16">
        Welcome to ToolHub! Your community-centric platform for sharing and
        collaborating on tools. Join groups based on your location and trade to
        connect with like-minded individuals. From carpentry to gardening,
        ToolHub facilitates seamless tool sharing, making your projects easier.
        Join us, and let's expand your toolbox together at ToolHub – where
        community meets craftsmanship!
      </div>
    </div>
  );
};
