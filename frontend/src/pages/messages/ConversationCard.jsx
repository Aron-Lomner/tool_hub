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
      className="w-full hover:bg-gray-100 "
    >
      <div className="flex flex-row h-20 border border-gray-300">
        {imageUrl && <img src={imageUrl} alt="Image" className="p-4 w-20" />}
        <div>
          <p className="font-bold text-xl">{username}</p>
          <p className="text-gray-600 truncate max-w-lg">
            <i>{message}</i>
          </p>
        </div>
      </div>
    </button>
  );
};

export default ConversationCard;
