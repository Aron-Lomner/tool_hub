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
    <div>
      <h1 className="text-4xl text-center">Profile</h1>
      <div>
        <img
          src={userDetails.imageUrl}
          alt=""
          className="m-4 object-cover rounded-full aspect-square border w-[25vw] max-w-[300px]"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name=""
          id=""
          defaultValue={userDetails.firstName}
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name=""
          id=""
          defaultValue={userDetails.lastName}
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name=""
          id=""
          defaultValue={userDetails.email}
          className="bg-inherit border-b-2 border-[#cc3363] placeholder-[#cc3363] text-[#cc3363] h-[35px] focus:outline-none mb-4"
        />
        <button className="bg-blue-500 hover:bg-blue-300 text-white px-2 py-2 rounded-md font-bold shadow-md mx-10">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
