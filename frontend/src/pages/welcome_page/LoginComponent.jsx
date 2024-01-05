import { useState } from "react";

// eslint-disable-next-line react/prop-types
const LoginComponent = ({ toggleLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-white bg-opacity-75 p-5 flex flex-col items-center justify-center shadow-2xl mx-4 my-8 rounded-[25px]">
      <h1 className="text-xl font-bold text-[#cc3363] px-10">
        Unlock possibilities, sign in to ToolHub!
      </h1>
      <form onSubmit={login} className="p-4 flex flex-col w-[100%]">
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
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
          className=" bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363 h-[35px] focus:outline-none mb-4"
        />
        <button
          type="submit"
          className="bg-white text-[#cc3363] rounded-md p-1 font-bold text-2xl shadow-xl hover:bg-[#cc3363] hover:text-white my-5 px-5 h-[50px]"
        >
          Sign In
        </button>
      </form>
      <p onClick={toggleLogin} className="italic cursor-pointer">
        Or Sign Up
      </p>
    </div>
  );
};

export default LoginComponent;
