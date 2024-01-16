// export default GroupMessageCard;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";

// THIS PAGE MAY NEED TO BE REFACTORED AS IT WAS COPIED FROM THE GROUPMESSAGECARD.JSX

const DirectMessageCard = ({ message }) => {
  const imageUrl = "https://rb.gy/m659i5";

  const isYou = (username) => {
    const cookie = Cookies.get("username");
    console.log(cookie, ":", username);
    return username === cookie;
  };
  
  message.you = isYou(message.senderUsername);
  console.log("Message: ", message);

  return (
    <div
      className={
        "pr-5 flex items-center w-[65%] rounded-md my-4 shadow-md " +
        (message.you
          ? " border bg-blue-400 ml-auto mr-2 text-white"
          : " border bg-gray-200 mr-auto ml-2 ")
      }
    >
      <img src={imageUrl} alt="Image" className="p-4 w-[80px] h-[80px]" />
      <div className="flex flex-col">
        <h1 className="font-bold text-xl ">{message.senderUsername}</h1>
        <p className="break-words">{message.message}</p>
      </div>
    </div>
  );
};

export default DirectMessageCard;
