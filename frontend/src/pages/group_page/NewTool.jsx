/* eslint-disable react/prop-types */
import { useState } from "react";
import GroupService from "../../services/GroupService";
import UnauthorizedError from "../../errors/UnauthorizedError";
import ConflictError from "../../errors/ConflictError";

const NewTool = ({ isRequest, groupName, exit }) => {
  const [toolDetails, setToolDetails] = useState({
    toolName: "",
    imageUrl: "",
    description: "",
    isRequest: isRequest,
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the createToolOrder method from GroupService
      await GroupService.createToolOrder({
        groupName,
        ...toolDetails,
      });

      // Reset form inputs and errors
      setToolDetails({
        toolName: "",
        imageUrl: "",
        description: "",
        isRequest: isRequest,
      });
      setError(null);

      // Close the NewTool component
      exit();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        // Handle unauthorized error (session timeout, redirect to login)
      } else if (error instanceof ConflictError) {
        // Handle conflict error (e.g., tool name is taken)
        setError("Tool name is taken!");
      } else {
        // Handle other errors
        setError("Error creating tool order. Please try again.");
      }
    }
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
              value={toolDetails.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-600"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={toolDetails.imageUrl}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
