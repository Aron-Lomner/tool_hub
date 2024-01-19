/* eslint-disable react/prop-types */
import { useState } from "react";
import GroupService from "../../services/GroupService";
import UnauthorizedError from "../../errors/UnauthorizedError";
import ConflictError from "../../errors/ConflictError";
import { useNavigate } from "react-router-dom";

const NewTool = ({ isRequest, groupName, exit }) => {
  const [toolDetails, setToolDetails] = useState({
    toolName: "",
    imageUrl: "",
    description: "",
    request: isRequest,
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Creating tool offer: ", toolDetails);
    let imageUrl;
    try {
      // Upload image to ImgBB and get the URL
      const imageData = new FormData();
      imageData.append("image", toolDetails.imageUrl);

      const imgBbResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=47a311160676f61a5572f0ee97b00105",
        {
          method: "POST",
          body: imageData,
        }
      );
      const imgBbData = await imgBbResponse.json();
      imageUrl = imgBbData.data.url;
      console.log("-----Image: ", imageUrl);
      if (imageUrl.length > 100) {
        throw new Error("Can't upload image!");
      }
    } catch (error) {
      setError("Error uploading image");
      console.log(error);
      return;
    }
    try {
      // Call the createToolOrder method from GroupService
      await GroupService.createToolOrder({
        groupName,
        ...toolDetails,
        imageUrl: imageUrl,
      });

      // Reset form inputs and errors
      setToolDetails({
        toolName: "",
        imageUrl: "",
        description: "",
        isRequest: isRequest,
      });
      setError("");

      // Close the NewTool component
      exit();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      } else if (error instanceof ConflictError) {
        // Handle conflict error (e.g., tool name is taken)
        setError("Tool name is taken!");
      } else {
        // Handle other errors
        setError("Error creating tool order. Please try again.");
      }
    }
  };
  const handleImageChange = (e) => {
    setToolDetails({
      ...toolDetails,
      imageUrl: e.target.files[0],
    });
  };
  const handleInputChange = (e) => {
    setToolDetails({
      ...toolDetails,
      [e.target.name]: e.target.value,
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
        <h2 className="text-2xl font-semibold mb-4">
          {isRequest ? "Create a New Tool Request" : "Create a New Tool Offer"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="toolName"
              className="block text-sm font-medium text-gray-600"
            >
              Tool Name
            </label>
            <input
              type="text"
              id="toolName"
              maxLength={100}
              name="toolName"
              value={toolDetails.toolName}
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
              name="description"
              maxLength={200}
              value={toolDetails.description}
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
              className="bg-violet-700 hover:bg-violet-950 text-white py-2 px-4 rounded-md "
            >
              Create Tool
            </button>
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTool;
