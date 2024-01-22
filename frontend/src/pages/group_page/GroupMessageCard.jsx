// export default GroupMessageCard;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageService from "../../services/MessageService";
import UnauthorizedError from "../../errors/UnauthorizedError";
const GroupMessageCard = ({ message }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const isYou = (username) => {
    const cookie = Cookies.get("username");
    console.log(cookie, ":", username);
    return username === cookie;
  };
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
          ? " border bg-purple-400 ml-auto mr-2 text-white"
          : " border bg-gray-200 mr-auto ml-2 ")
      }
    >
      <img src={imageUrl} alt="Image" className="p-4 w-[80px] h-[80px]" />
      <div className="flex flex-col">
        <h1
          className="font-bold text-xl cursor-pointer"
          onClick={() => {
            navigate("/messages", {
              state: { username: message.senderUsername },
            });
          }}
        >
          {message.you ? "you" : message.senderUsername}
        </h1>
        <p className="break-words break-all">{message.message}</p>
      </div>
    </div>
  );
};

export default GroupMessageCard;
