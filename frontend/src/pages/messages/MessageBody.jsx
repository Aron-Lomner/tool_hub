/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ConversationCard from "./ConversationCard";
import MessageService from "../../services/MessageService";
import SearchBar from "../../components/SearchBar";
import DirectMessageModal from "./direct_message/DirectMessageModal";
import { useLocation, useNavigate } from "react-router-dom";
import UnauthorizedError from "../../errors/UnauthorizedError";
import UserService from "../../services/UserService";
import UserResult from "./UserResult";

const MessageBody = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [chatWith, setChatWith] = useState(
    location.state ? location.state.username : ""
  );
  const [messageCards, setMessageCards] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const getConversations = async () => {
    try {
      // List of usernames
      const conversations = await MessageService.getConversations();
      setMessageCards(conversations);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      } else {
        console.log("Error!", error);
      }
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  const handleSearch = async (searchTerm) => {
    const results = await UserService.mockSearchUsersByUsernamePattern();
    const filteredResults = results.filter((result) =>
      result.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div
      className="flex flex-col justify-center items-center"
      onClick={(e) => {
        e.target === e.currentTarget && setSearchResults([]);
      }}
    >
      <div className="my-5">
        <SearchBar onChange={(searchTerm) => handleSearch(searchTerm)} />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute bg-white top-[15vh] overflow-y-auto h-[65vh] w-[90vw] max-w-[1000px] border">
          {searchResults.map((result, index) => (
            <UserResult user={result} key={index} />
          ))}
        </div>
      )}
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
            getConversations();
          }}
        />
      )}
    </div>
  );
};

export default MessageBody;
