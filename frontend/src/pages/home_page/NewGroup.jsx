/* eslint-disable react/prop-types */
// Import necessary dependencies
import { useState } from "react";
import GroupService from "../../services/GroupService";
import UnauthorizedError from "../../errors/UnauthorizedError";

// Create the NewGroup component
const NewGroup = ({ exit }) => {
  // State to manage form inputs
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    description: "",
    image: "",
  });

  // State to manage error handling
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
        //TODO displa error then redirect to home page
      }
      console.error("Error creating group:", error.message);
      setError(error.message);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    setGroupDetails({
      ...groupDetails,
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
        <h2 className="text-2xl font-semibold mb-4">Create a New Group</h2>

        {/* Display error message if there is an error */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

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
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={groupDetails.image}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewGroup;
