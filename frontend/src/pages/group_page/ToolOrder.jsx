/* eslint-disable react/prop-types */
import { useState } from "react";
import Cookies from "js-cookie";
import { FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import GroupService from "../../services/GroupService";
import UnauthorizedError from "../../errors/UnauthorizedError";

const ToolOrder = ({
  // eslint-disable-next-line no-unused-vars
  id,
  toolName,
  imageUrl,
  description,
  request,
  date,
  ownerUsername,
}) => {
  const navigate = useNavigate();
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
    request,
    ownerUsername
  );
  return (
    <div className=" shadow-md bg-[#ffffff77] backdrop-blur border-white border-2 rounded-md box-border">
      <div className="flex items-center mb-2">
        <img
          src={imageUrl}
          alt={`${toolName} image`}
          className="p-4 w-[80px] h-[80px]"
          onClick={openModal}
        />
        <div className="flex flex-col">
          <span className="text-xl font-bold">{toolName}</span>
          <p className="text-gray-600 mb-2">{description}</p>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              <i>Posted by: {ownerUsername}</i>
            </span>
            <span className="text-sm ml-4 text-gray-500">
              <i>{date}</i>
            </span>
          </div>
        </div>
        <div className="flex flex-col ml-auto">
          {isYou(ownerUsername) && (
            <button
              className="bg-violet-700 hover:bg-violet-950 text-white px-2 py-2 rounded-md font-bold shadow-md ml-auto mr-2 mb-2 mt-1 "
              onClick={() => {
                try {
                  GroupService.deleteToolOrder(id);
                } catch (error) {
                  if (error instanceof UnauthorizedError) {
                    navigate("/", { state: { msg: "Session Timed Out" } });
                  }
                  console.log(error);
                }
              }}
            >
              <FaTrash />
            </button>
          )}
          <button
            className="bg-violet-700 hover:bg-violet-950 text-white px-4 py-2 rounded-md font-bold shadow-md ml-auto mr-2 mt-1"
            onClick={() => {
              navigate("/messages", { state: { username: ownerUsername } });
            }}
          >
            Message
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
          className="mx-auto my-auto max-w-[75%] max-h-full"
        />
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 p-4 text-black text-4xl"
        >
          <span>&times;</span>
        </button>
      </Modal>
    </div>
  );
};

export default ToolOrder;
