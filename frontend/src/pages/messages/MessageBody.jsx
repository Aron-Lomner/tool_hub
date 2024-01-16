/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import ConversationCard from "./ConversationCard";
import MessageService from "../../services/MessageService";
import SearchBar from "../../components/SearchBar";
import DirectMessageModal from "./direct_message/DirectMessageModal";

const MessageBody = () => {
  const [chatWith, setChatWith] = useState("");
  const [messageCards, setMessageCards] = useState([]);

  const getConversations = async () => {
    try {
      //List of usernames
      const conversations = await MessageService.getConversations();

      setMessageCards(conversations);
    } catch (error) {
      console.log("Error!", error);
    }
  };
  useEffect(() => {
    getConversations();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="my-5">
        <SearchBar onSearch={() => {}} />
      </div>
      <div className="flex flex-col items-center flex-grow-[10] max-h-[75vh] overflow-y-auto border border-gray-300  mx-10 w-[95vw] max-w-[1000px]">
        {messageCards.map((messageCard, index) => (
          <ConversationCard
            key={index}
            messageCard={messageCard}
            setChatWith={setChatWith}
          />
        ))}
      </div>
      {chatWith !== "" && (
        <DirectMessageModal
          user={chatWith}
          exit={() => {
            setChatWith("");
          }}
        />
      )}
    </div>
  );
};

export default MessageBody;

// {isModalOpen && (
//   <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
//     <div className="bg-white p-8 max-w-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">New Message</h2>
//       <form>
//         <label className="block mb-2">User Name:</label>
//         <input
//           type="text"
//           name="userName"
//           value={newMessage.userName}
//           onChange={handleInputChange}
//           className="border p-2 mb-4 w-full"
//         />

//         <label className="block mb-2">Message:</label>
//         <textarea
//           name="message"
//           value={newMessage.message}
//           onChange={handleInputChange}
//           className="border p-2 mb-4 w-full"
//         />

//         <label className="block mb-2">Image URL:</label>
//         <input
//           type="text"
//           name="imageUrl"
//           value={newMessage.imageUrl}
//           onChange={handleInputChange}
//           className="border p-2 mb-4 w-full"
//         />

//         <button
//           type="button"
//           onClick={addMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
//         >
//           Add Message
//         </button>
//         <button
//           type="button"
//           onClick={closeModal}
//           className="bg-gray-300 px-4 py-2 rounded-md"
//         >
//           Cancel
//         </button>
//       </form>
//     </div>
//   </div>
// )}
