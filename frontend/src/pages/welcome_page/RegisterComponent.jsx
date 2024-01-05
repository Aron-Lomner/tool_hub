/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/prop-types
const RegisterComponent = ({ toggleLogin }) => {
  const register = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-white bg-opacity-75 p-5 flex flex-col items-center justify-center shadow-2xl mx-4 my-8 rounded-[25px]">
      <h1 className="text-xl font-bold text-[#cc3363] px-10">
        Join ToolHub, craft your account today!
      </h1>
      <form onSubmit={register} className="p-4 flex flex-col w-[100%]">
        <label htmlFor="firstName"></label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          defaultValue=""
          placeholder="First Name"
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="lastName"></label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          defaultValue=""
          placeholder="Last Name"
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="email"></label>
        <input
          type="text"
          id="email"
          name="email"
          defaultValue=""
          placeholder="example@email.com"
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue=""
          placeholder="Username"
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="password"></label>
        <input
          type="text"
          id="password"
          name="password"
          defaultValue=""
          placeholder="Password"
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
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
