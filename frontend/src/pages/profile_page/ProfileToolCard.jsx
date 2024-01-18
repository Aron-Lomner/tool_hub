/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Cookies from "js-cookie";
import { FaTrash } from "react-icons/fa";
import Modal from "react-modal";

const ProfileToolCard = ({
  // eslint-disable-next-line no-unused-vars
  id,
  toolName,
  imageUrl,
  description,
  isRequest,
  owner,
  groupName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isYou = (username) => {
    const cookie = Cookies.get("username");
    console.log(cookie, ":", username);
    return username === cookie;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(
    "Order:",
    id,
    toolName,
    imageUrl,
    description,
    isRequest,
    owner,
    groupName,
  );
  return (
    <>
      {isYou(owner) && (
        <div
          className={`p-4 rounded-md shadow-md mb-1 ${
            isRequest ? "bg-green-100" : "bg-blue-100"
          }`}
        >
          <div className="flex items-center mb-2">
            <img
              src={imageUrl}
              alt={`${toolName} image`}
              className="p-4 w-[80px] h-[80px]"
              onClick={openModal}
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold">{toolName}</span>
              <p className="text-gray-600 mb-2 text-xs">{description}</p>
              <p className="text-black font-bold text-xs">{groupName}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500"></span>
              </div>
            </div>
            <div className="flex flex-col ml-auto">
              <button className="bg-blue-500 hover:bg-blue-300 text-white px-2 py-2 rounded-md font-bold shadow-md ml-auto mr-2 mb-2">
                <FaTrash />
              </button>
            </div>
          </div>

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Image Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "80vw",
                height: "80vh",
                margin: "auto",
              },
            }}
          >
            {/* Your modal content */}
            <img
              src={imageUrl}
              alt={`${toolName} image`}
              className="w-full h-full"
            />
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 p-4 text-black text-4xl"
            >
              <span>&times;</span>
            </button>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ProfileToolCard;