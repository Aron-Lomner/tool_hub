/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import DirectMessagePage from "./temp/DirectMessagePage";
import UserService from "../../services/UserService";
import GroupService from "../../services/GroupService";
import MessageService from "../../services/MessageService";

const ConversationCard = ({ messageCard, setChatWith }) => {
  const { username, message } = messageCard;
  const [imageUrl, setImageUrl] = useState("");

  const getImage = async () => {
    const response = await MessageService.getUserImage(username);
    setImageUrl(response.data);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <button
      onClick={() => {
        setChatWith(username);
      }}
      className="w-full hover:bg-gray-100 "
    >
      <div className="flex flex-row h-20 border border-gray-300">
        {imageUrl && (
          <img src={imageUrl} alt="User Image" className="p-4 w-20" />
        )}
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
