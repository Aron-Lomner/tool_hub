/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UnauthorizedError from "../../errors/UnauthorizedError";
import GroupService from "../../services/GroupService";
const SearchResultComponent = ({ group }) => {
  const { name, description, imageUrl } = group;
  const [inGroup, isInGroup] = useState(false);

  const setInGroup = async () => {
    const status = await GroupService.userIsInGroup(name);
    isInGroup(status);
    console.log("status: ", status);
  };

  const joinGroup = async () => {
    try {
      await GroupService.userJoinGroup(name);
      setInGroup();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        //TODO: log out and display message
      } else {
        //TODO: display message
      }
    }
    console.log("Joined group: ", name);
  };

  useEffect(() => {
    setInGroup();
  }, []);

  return (
    <div className="shadow-md border-gray-300 border bg-[#ffffff55] backdrop-blur box-border flex m-2 list-none w-[80vw] max-w-[800px] justify-between rounded-md">
      <img
        src={imageUrl}
        alt=""
        className="m-4 h-[80px] object-cover rounded-full aspect-square "
      />
      <div className="mx-12">
        <h1 className="font-roboto text-2xl font-bold text-violet-700">
          {name}
        </h1>
        <p className="m-0 w-full text-violet-700 break-words p-2">
          {description}
        </p>
      </div>
      {!inGroup ? (
        <button
          onClick={joinGroup}
          className="bg-violet-700 hover:bg-violet-950 text-white px-4 py-2 rounded-md font-bold shadow-md h-[40%] ml-auto my-10 mx-5"
        >
          Join
        </button>
      ) : (
        <div className="bg-gray-300 text-white px-4 py-2 rounded-md font-bold shadow-md h-[40%] ml-auto my-10 mx-5 cursor-not-allowed">
          Joined
        </div>
      )}
    </div>
  );
};

export default SearchResultComponent;
