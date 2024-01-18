import { useEffect, useState } from "react";
import RegisterLoginService from "../../services/RegisterLoginService";
import UnauthorizedError from "../../errors/UnauthorizedError";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LoginComponent = ({ toggleLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(
    location.state ? location.state.msg : ""
  );
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
    return formData.password !== "" && formData.username != "";
  };
  const login = async (e) => {
    e.preventDefault();
    if (formIsValid()) {
      try {
        await RegisterLoginService.login(formData.username, formData.password);
        navigate("/home");
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          displayErrorMessage("Incorrect Username or Password");
          console.log("unauthorized!!!");
        } else {
          console.log(error);
        }
      }
    } else {
      displayErrorMessage("Missing Required Field!");
    }
  };
  useEffect(() => {
    setTimeout(() => setErrorMessage(""), 3000);
  }, []);
  return (
    <div className="bg-[#ffffff77] backdrop-blur border-white border-2 rounded-[25px] box-border w-[40vw] h-[70vh] min-w-[250px] flex flex-col items-center justify-center p-10 mx-4 my-8 ">
      <h1 className="font-bold text-[#ffffff] text-4xl pb-10 px-10">LOGIN</h1>
      <form onSubmit={login} className="flex flex-col w-[100%] max-w-[400px]">
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="bg-inherit border-b-2 border-[#ffffff] placeholder-[#ffffff] text-[#ffffff] h-[35px] focus:outline-none mb-4 appearance-none"
        />

        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className=" bg-inherit border-b-2 border-[#ffffff] placeholder-[#ffffff] text-[#ffffff] h-[35px] focus:outline-none mb-4"
        />
        <p className="text-red-500 text-center">{errorMessage}</p>
        <button
          type="submit"
          className="bg-transparent backdrop-blur-[12px] text-violet-700 rounded-md p-1 font-bold text-2xl shadow-xl hover:bg-white hover:text-violet-950 border-white border-2 my-5 px-5 h-[50px] transition-transform transform-gpu hover:scale-105"
        >
          Sign In
        </button>
      </form>
      <p onClick={toggleLogin} className="italic cursor-pointer text-white hover:text-violet-700 transition-transform transform-gpu hover:scale-105">
        Or Sign Up
      </p>
    </div>
  );
};

export default LoginComponent;
