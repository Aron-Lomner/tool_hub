import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import UnauthorizedError from "../../errors/UnauthorizedError";

const ProfileInfo = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await UserService.getUserDetails();
      console.log("response: ----", response);
      setUserDetails(response);
      setLoading(false);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      }
      console.log(error, "--while getting user details");
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefualt();
    if (Object.values(userDetails).every((v) => v !== "")) {
      try {
        await UserService.updateUserData(userDetails);
        getUserDetails();
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          navigate("/", { state: { msg: "Session Timed Out" } });
        } else {
          console.log(error);
          setLoading(false);
        }
      }
    } else {
      setLoading(true);
    }
  };
  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    try {
      setLoading(true);
      const imageUrl = await UserService.imageToUrl(e.target.files[0]);
      await UserService.updateImageUrl(imageUrl);
      getUserDetails();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      } else {
        console.log(error);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="justify-center items-center">
      <h1 className="text-4xl text-center font-bold mt-16 mb-3 bg-[#96a5fa01] backdrop-blur-sm text-white">
        Profile
      </h1>
      <div>
        <div className="flex justify-center items-center mb-3">
          <div className="relative">
            <input
              disabled={loading}
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="hidden" // Hide the default file input
              accept="image/*"
            />
            <label
              htmlFor="image"
              style={{ backgroundImage: `url(${userDetails.imageUrl})` }}
              className={`border bg-cover rounded-full aspect-square h-[15vh] flex items-center justify-center cursor-pointer`}
            >
              <span className="text-white bg-[#00000065] text-center">
                {loading ? "loading ..." : "Upload Image"}
              </span>
            </label>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-white shadow-md bg-[#ffffff77] backdrop-blur border-white border-2 rounded-[25px] box-border p-3 font-semibold"
        >
          <label htmlFor="first">First Name:</label>
          <input
            required
            disabled={loading}
            type="text"
            name="first"
            id="first"
            defaultValue={userDetails.firstName}
            onChange={handleInputChange}
            className="bg-inherit border-b-2 border-violet-700 placeholder-violet-700 text-violet-400 h-[35px] focus:outline-none mb-4"
          />
          <label htmlFor="last">Last Name:</label>
          <input
            required
            disabled={loading}
            type="text"
            name="last"
            id="last"
            onChange={handleInputChange}
            defaultValue={userDetails.lastName}
            className="bg-inherit border-b-2 border-violet-700 placeholder-violet-700 text-violet-400 h-[35px] focus:outline-none mb-4"
          />
          <label htmlFor="email">Email:</label>
          <input
            required
            disabled={loading}
            type="text"
            defaultValue={userDetails.email}
            onChange={handleInputChange}
            className="bg-inherit border-b-2 border-violet-700 placeholder-violet-700 text-violet-400 h-[35px] focus:outline-none mb-4"
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-violet-700 hover:bg-violet-950 text-white px-2 py-2 rounded-md font-bold shadow-md mx-10 transition-transform transform-gpu hover:scale-105"
          >
            {loading ? "Loading..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
