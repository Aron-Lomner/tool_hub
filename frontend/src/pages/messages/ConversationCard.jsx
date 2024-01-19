/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import DirectMessagePage from "./temp/DirectMessagePage";

const ConversationCard = ({ messageCard, setChatWith }) => {
  const { username, message, imageUrl } = messageCard;

  return (
    <button
      onClick={() => {
        setChatWith(username);
      }}
      className="w-[95%]   transition-transform transform-gpu hover:scale-105  "
    >
      <div className="flex flex-row h-20 backdrop-blur bg-[#ffffff77] hover:bg-[#ffffffb9] rounded-lg    mt-3">
        {imageUrl && <img src={imageUrl} alt="Image" className="p-4 w-20" />}
        <div className=" text-violet-700 ">
          <p className="font-bold text-xl ">{username}</p>
          <p className=" truncate max-w-lg">
            <i>{message}</i>
          </p>
        </div>
      </div>
    </button>
  );
};

export default ConversationCard;
