/* eslint-disable react/prop-types */
import { useState } from "react";
import GroupService from "../../services/GroupService";
import UnauthorizedError from "../../errors/UnauthorizedError";
import ConflictError from "../../errors/ConflictError";
import { useNavigate } from "react-router-dom";

// Create the NewGroup component
const NewGroup = ({ exit }) => {
  // State to manage form inputs
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  // State to manage error handling
  const [error, setError] = useState(null);
  const displayErrorMessage = (msg, time) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, time * 1000);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      displayErrorMessage("Missing required field!", 3);
      return;
    }
    let imageUrl;
    try {
      // Upload image to ImgBB and get the URL
      const imageData = new FormData();
      imageData.append("image", groupDetails.image);

      const imgBbResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=47a311160676f61a5572f0ee97b00105",
        {
          method: "POST",
          body: imageData,
        }
      );
      const imgBbData = await imgBbResponse.json();
      imageUrl = imgBbData.data.url;
    } catch (error) {
      displayErrorMessage("Error uploading image", 3);
      return;
    }
    try {
      //set it to image url
      groupDetails.image = imageUrl;
      if (imageUrl.length > 100) {
        throw new Error("Image url is to big!");
      }
      // Call the createGroup method from GroupService
      const groupData = await GroupService.createGroup(groupDetails);
      console.log("Group created successfully:", groupData);

      // Reset form inputs and errors
      setGroupDetails({
        name: "",
        description: "",
        image: "",
      });
      setError(null);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      } else if (error instanceof ConflictError) {
        displayErrorMessage("Group name is taken!", 3);
      }
      console.error("Error creating group:", error.message);
      setGroupDetails(
        "Error creating group, if issue persists please contact us."
      );
    }
  };
  //Returns true if none of the form fileds are empty
  const formIsValid = () => {
    return () => Object.values(groupDetails).every((value) => value !== "");
  };
  // Function to handle input changes
  const handleInputChange = (e) => {
    setGroupDetails({
      ...groupDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    setGroupDetails({
      ...groupDetails,
      image: e.target.files[0],
    });
  };
  return (
    <div
      onClick={(e) => {
        e.target === e.currentTarget && exit();
      }}
      className="fixed top-0 left-0 h-screen w-screen bg-[#79757534] flex items-center justify-center"
    >
      <div className="max-w-md p-6 bg-white rounded-md shadow-md min-w-[40vw]">
        <h2 className="text-2xl font-semibold mb-4">Create a New Group</h2>

        {/* Group creation form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Group Name
            </label>
            <input
              type="text"
              maxLength={255}
              id="name"
              name="name"
              value={groupDetails.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              maxLength={400}
              name="description"
              value={groupDetails.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image Upload
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md"
              accept="image/*" // Allow only image files
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Create Group
            </button>
            <p className="text-red-600">{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewGroup;
