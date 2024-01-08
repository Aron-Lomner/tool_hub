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

  //Still battling with this below. The Registration Successful message is showing in the console (39), but is not displaying the RegisterSuccessComponent shown in line 74.

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
    <div className="bg-white bg-opacity-75 p-5 flex flex-col items-center justify-center shadow-2xl mx-4 my-8 rounded-[25px]">
      {registrationSuccess && <RegisterSuccessComponent />}
      <h1 className="text-xl font-bold text-[#cc3363] px-10">
        Join ToolHub, craft your account today!
      </h1>
      <form onSubmit={register} className="p-4 flex flex-col w-[100%]">
        <label htmlFor="firstName"></label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="lastName"></label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="email"></label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="password"></label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <p className="text-red-500 text-center">{errorMessage}</p>
        <button
          type="submit"
          className="bg-white text-[#cc3363] rounded-md p-1 font-bold text-2xl shadow-xl hover:bg-[#cc3363] hover:text-white my-5 px-5 h-[50px]"
        >
          Register
        </button>
      </form>
      <p onClick={toggleLogin} className="italic cursor-pointer">
        Or Login
      </p>
    </div>
  );
};

export default RegisterComponent;
