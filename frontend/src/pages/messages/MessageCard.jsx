/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import DirectMessagePage from "./DirectMessagePage";

const MessageCard = ({ messageCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const { unread, userName, message, imageUrl } = messageCard;

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = (e) => {
      e.stopPropagation(); 
      setIsModalOpen(false);
      // Optionally, you can clear the new message form here
    };
  

    return (
      <button onClick={openModal} className="w-full hover:bg-gray-100 ">
        <div className="flex flex-row h-20 border border-gray-300">
        {unread}
        {imageUrl && <img src={imageUrl} alt="Image" className="p-4 w-20"/>}
        <div>
          <p className="font-bold text-xl">{userName}</p>
          <p className="text-gray-600 truncate max-w-lg"><i>{message}</i></p>
          </div>
        </div>
        {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 max-w-md rounded-md">
          <button type="button" onClick={(e) => closeModal(e)}className="bg-gray-300 px-4 py-2 rounded-md">
                X
              </button>
            <h2 className="text-2xl font-bold mb-4">{userName}</h2>
            
              <DirectMessagePage/>

              
              
            
          </div>
        </div>
      )}
      </button>
    );
  };
  
  export default MessageCard;
  