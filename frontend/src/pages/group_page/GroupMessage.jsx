import React, { useState } from "react";
import GroupMessageCard from "./GroupMessageCard";

const GroupMessage = () => {
  const [newMessage, setNewMessage] = useState({
    sent: true,
    userName: "",
    message: "",
    imageUrl: "/src/assets/emptyImage.webp",
  });

  const [messageCards, setMessageCards] = useState([
    {
      sent: false,
      userName: "UserName",
      message: "This is an example of a message",
      imageUrl: "/src/assets/emptyImage.webp",
    },
    {
      sent: true,
      userName: "Bob",
      message: "This is a message sent by me, Bob",
      imageUrl: "/src/assets/emptyImage.webp",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
  };

  const addMessage = () => {
    // Handle the logic to add the new message to your data (e.g., messageCards array)
    // This is a simplified example; you may want to update your state or make an API call
    setMessageCards((prevMessageCards) => [...prevMessageCards, newMessage]);
    // For now, just log the new message to the console
    console.log("New Message:", newMessage);

    // Reset the form after adding the message
    setNewMessage({
      sent: true,
      userName: "You",
      message: "",
      imageUrl: "/src/assets/emptyImage.webp",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="overflow-y-auto border border-gray-300 bw mx-10 mt-10 messages-body-container w-[95vw] max-w-[1000px] h-[95vw] max-h-[700px]">
        {messageCards.map((messageCard, index) => (
          <GroupMessageCard key={index} messageCard={messageCard} />
        ))}
      </div>

      <div className="bg-gray-100 p-5 flex items-center justify-center w-[95vw] max-w-[1000px]">
        <textarea
          name="message"
          value={newMessage.message}
          onChange={handleInputChange}
          className="border rounded-md p-2 w-full mr-5 hover-bg-gray-100 hover:border-black"
        />

        <button
          type="button"
          onClick={addMessage}
          className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-md font-bold shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupMessage;
