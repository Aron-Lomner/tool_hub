import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

const ProfileInfo = () => {
  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = async () => {
    try {
      const response = await UserService.getUserDetailsMock();
      setUserDetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="justify-center items-center">
      <h1 className="text-4xl text-center font-bold mt-16 mb-10 bg-[#96a5fa01] backdrop-blur-sm text-white">Profile</h1>
      <div>
        <img
          src={userDetails.imageUrl}
          alt=""
          className="m-4 object-cover rounded-full aspect-square border w-[25vw] max-w-[300px] hover:cursor-pointer"
          onClick={console.log("Image Clicked")}
        />
      </div>
      <div className="flex flex-col text-white shadow-md bg-[#ffffff77] backdrop-blur border-white border-2 rounded-[25px] box-border p-3 font-semibold">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name=""
          id=""
          defaultValue={userDetails.firstName}
          className="bg-inherit border-b-2 border-violet-700 placeholder-violet-700 text-violet-400 h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name=""
          id=""
          defaultValue={userDetails.lastName}
          className="bg-inherit border-b-2 border-violet-700 placeholder-violet-700 text-violet-400 h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name=""
          id=""
          defaultValue={userDetails.email}
          className="bg-inherit border-b-2 border-violet-700 placeholder-violet-700 text-violet-400 h-[35px] focus:outline-none mb-4"
        />
        <button className="bg-violet-700 hover:bg-violet-950 text-white px-2 py-2 rounded-md font-bold shadow-md mx-10 transition-transform transform-gpu hover:scale-105">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
