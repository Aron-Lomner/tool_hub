/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import RegisterLoginService from "../../services/RegisterLoginService";
import ConflictError from "../../errors/ConflictError";
import { useNavigate } from "react-router-dom";
import RegisterSuccessComponent from "./RegisterSuccessComponent";
import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
const RegisterComponent = ({ toggleLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const displayErrorMessage = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 2000);
  };
  const formIsValid = () => {
    return () => Object.values(formData).every((value) => value !== "");
  };

  useEffect(() => {
    if (registrationSuccess) {
      console.log("Registration Successful");
      // go to home page
      navigate("/home");
      console.log("this should print now");
    }
  }, [registrationSuccess, navigate]);

  const register = async (e) => {
    e.preventDefault();
    if (formIsValid()) {
      try {
        console.log("this prints!");
        await RegisterLoginService.register(formData);
        await RegisterLoginService.login(formData.username, formData.password);
        // Display Registration Successful Component
        setRegistrationSuccess(true);

        // go to home page
        // navigate("/home");
        console.log("this does not print");
      } catch (error) {
        if (error instanceof ConflictError) {
          displayErrorMessage("Username is taken");
        } else {
          displayErrorMessage(
            "Server error please refresh page. If error persists please contact us!"
          );
        }
      }
    } else {
      displayErrorMessage("Missing required fields!");
    }
  };

  return (
    <div className="bg-[#ffffff77] backdrop-blur border-white border-2 rounded-[25px] box-border w-[40vw] h-[70vh] min-w-[250px] flex flex-col items-center justify-center p-10 mx-4 my-8">
      {registrationSuccess && <RegisterSuccessComponent />}
      <h1 className="text-xl font-bold text-[#ffffff] px-10">Join ToolHub!</h1>
      <form
        onSubmit={register}
        className="flex flex-col w-[100%] max-w-[400px]"
      >
        <label htmlFor="firstName"></label>
        <input
          type="text"
          id="firstName"
          maxLength={40}
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#ffffff] placeholder-[#ffffff] text-[#ffffff] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="lastName"></label>
        <input
          type="text"
          id="lastName"
          maxLength={40}
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#ffffff] placeholder-[#ffffff] text-[#ffffff] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="email"></label>
        <input
          type="text"
          id="email"
          maxLength={100}
          name="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#ffffff] placeholder-[#ffffff] text-[#ffffff] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          maxLength={40}
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#ffffff] placeholder-[#ffffff] text-[#ffffff] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          maxLength={100}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#ffffff] placeholder-[#ffffff] text-[#ffffff] h-[35px] focus:outline-none mb-4"
        />
        <p className="text-red-500 text-center">{errorMessage}</p>
        <button
          type="submit"
          className="bg-transparent backdrop-blur-[12px] text-[#96a5fa] rounded-md p-1 font-bold text-2xl shadow-xl hover:bg-white hover:text-[#96a5fa] border-white border-2 my-5 px-5 h-[50px]"
        >
          Register
        </button>
      </form>
      <p onClick={toggleLogin} className="italic cursor-pointer text-white">
        Or Login
      </p>
    </div>
  );
};

export default RegisterComponent;
