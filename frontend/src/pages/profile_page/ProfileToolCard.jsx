/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import GroupService from "../../services/GroupService";

const ProfileToolCard = ({
  // eslint-disable-next-line no-unused-vars
  id,
  toolName,
  imageUrl,
  description,
  isRequest,
  groupName,
  date,
  refresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    groupName,
    date
  );
  return (
    <>
      <div
        className={`p-4 rounded-md shadow-md mb-1 opacity-95 ${
          isRequest ? "bg-green-300" : "bg-violet-300"
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
            <span className="text-xl font-bold text-white mb-1">
              {toolName}
            </span>
            <p className="text-white mb-2 text-xs">{description}</p>
            <p className="text-white font-bold text-sm">{groupName}</p>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <div className="flex flex-col ml-auto">
            <button
              className="bg-violet-700 hover:bg-violet-950 text-white px-2 py-2 rounded-md font-bold shadow-md ml-auto mr-2 mb-2 transition-transform transform-gpu hover:scale-105"
              onClick={async () => {
                await GroupService.deleteToolOrder(id);
                refresh();
              }}
            >
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
    </>
  );
};

export default ProfileToolCard;
