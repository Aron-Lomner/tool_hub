/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MessageService from "../../../services/MessageService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UnauthorizedError from "../../../errors/UnauthorizedError";
const DirectMessageCard = ({ message }) => {
  const navigate = useNavigate();
  const isYou = (username) => {
    const cookie = Cookies.get("username");
    console.log(cookie, ":", username);
    return username === cookie;
  };
  const [imageUrl, setImageUrl] = useState("");

  message.you = isYou(message.senderUsername);
  console.log("Message: ", message);
  const getImage = async () => {
    try {
      const image = await MessageService.getUserImage(message.senderUsername);
      setImageUrl(image.data);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      } else {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getImage();
  }, []);
  return (
    <div
      className={
        "pr-5 flex items-center w-[65%] rounded-md my-4 shadow-md " +
        (message.you
          ? " border bg-blue-400 ml-auto mr-2 text-white"
          : " border bg-gray-200 mr-auto ml-2 ")
      }
    >
      <img src={imageUrl} alt="user pic" className="p-4 w-[80px] h-[80px]" />

      <div className="flex flex-col">
        <h1 className="font-bold text-xl ">
          {message.you ? "you" : message.senderUsername}
        </h1>
        <p className="break-words break-all">{message.message}</p>
      </div>
    </div>
  );
};

export default DirectMessageCard;
