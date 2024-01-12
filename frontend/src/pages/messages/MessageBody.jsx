/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

import React, { useState } from "react";
import MessageCard from "./MessageCard";

const MessageBody = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    userName: "",
    message: "",
    imageUrl: "/src/assets/emptyImage.webp",
  });
  const [messageCards, setMessageCards] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Optionally, you can clear the new message form here
    setNewMessage({
      userName: "",
      message: "",
      imageUrl: "",
    });
  };

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

    closeModal();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="flex justify-center items-center text-center text-white font-bold text-xl bg-blue-500 h-12 p-2 m-10 shadow-xl hover:bg-blue-300"
        onClick={openModal}
      >
        Direct Message
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 max-w-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">New Message</h2>
            <form>
              <label className="block mb-2">User Name:</label>
              <input
                type="text"
                name="userName"
                value={newMessage.userName}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />

              <label className="block mb-2">Message:</label>
              <textarea
                name="message"
                value={newMessage.message}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />

              <label className="block mb-2">Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={newMessage.imageUrl}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />

              <button
                type="button"
                onClick={addMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
              >
                Add Message
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center flex-grow-[10] max-h-[75vh] min-h-[70vh]">
        <div className="overflow-y-auto border border-gray-300  mx-10 w-[95vw] max-w-[1000px] flex-grow-[5] ">
          <div className="messages-body-container">
            {messageCards.map((messageCard, index) => (
              <MessageCard key={index} messageCard={messageCard} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBody;
