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
    <div className="bg-[url('/src/assets/bg2.jpg')] bg-cover bg-no-repeat bg-center min-h-screen flex flex-wrap justify-center items-center">
      {/* <header className="bg-light-sage-green shadow-2xl h-12 p-3 font-bold m-0">
        LOGO
      </header> */}
        <AboutUsComponent />
        {login ? (
          <LoginComponent toggleLogin={toggleLogin} />
        ) : (
          <RegisterComponent toggleLogin={toggleLogin} />
        )}
    </div>
  );
};

export default WelcomePage;

const AboutUsComponent = () => {
  return (
    <div className="bg-[#96a5fa01] backdrop-blur flex flex-col items-center justify-center box-border w-[40vw] h-[70vh] min-w-[250px] rounded-lg">
      <div className="m-4 flex flex-row items-center text-5xl text-white">
        Welcome
      </div>
      <div className="text-white px-2">
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
