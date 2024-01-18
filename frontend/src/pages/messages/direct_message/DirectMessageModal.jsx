import { useEffect, useState } from "react";
import DirectMessageCard from "./DirectMessageCard";
import MessageService from "../../../services/MessageService";
import UnauthorizedError from "../../../errors/UnauthorizedError";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const DirectMessageModal = ({ user, exit }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };
  const sendMessage = async () => {
    if (newMessage.length < 1 || newMessage.length > 400) {
      console.log("To short or long");
      return;
    }
    try {
      await MessageService.sendDm({
        targetUsername: user,
        message: newMessage,
      });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      } else {
        console.log(error);
      }
    }
    fetchMessages();
  };
  const fetchMessages = async () => {
    try {
      const response = await MessageService.getMessagesBetween(user);
      setMessages(response.data);
      //user image
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-white">
      <div className="overflow-y-auto border border-gray-300  mx-10 mt-10 w-[95vw] max-w-[1000px] flex-grow-[5] ">
        {messages.map((message, index) => (
          <DirectMessageCard key={index} message={message} />
        ))}
      </div>

      <div className="bg-gray-100 p-5 flex items-center justify-center w-[95vw] max-w-[1000px] mb-[2vh] ">
        <textarea
          name="message"
          value={newMessage}
          onChange={handleInputChange}
          className="border rounded-md p-2 w-full mr-5 hover-bg-gray-100 hover:border-black"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-md font-bold shadow-md"
        >
          Send
        </button>
      </div>
      <button
        className="fixed top-10 right-10 bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 text-lg font-extrabold"
        onClick={() => {
          exit();
        }}
      >
        X
      </button>
    </div>
  );
};

export default DirectMessageModal;
