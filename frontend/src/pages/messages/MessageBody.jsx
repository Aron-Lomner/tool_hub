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
      //Filter conversations
      const uniqueConversations = conversations.filter(
        (conversation, index, self) => {
          const foundIndex = self.findIndex(
            (c) => c.username === conversation.username
          );
          return index === foundIndex;
        }
      );
      console.log("Conversations ---- ", conversations);
      setMessageCards(uniqueConversations);
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
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    const results = await UserService.searchUsersByUsernamePattern(searchTerm);
    setSearchResults(results);
  };

  const handleMessageUserFromResult = (username) => {
    setChatWith(username);
  };

  return (
    <div
      className="flex flex-col justify-center items-center "
      onClick={(e) => {
        e.target === e.currentTarget && setSearchResults([]);
      }}
    >
    <h1 className="text-4xl text-center font-bold mt-16 mb-5 bg-[#96a5fa01] backdrop-blur-sm text-white"> Messages</h1>
      <div className="">
        <SearchBar onChange={(searchTerm) => handleSearch(searchTerm)} />
      </div>
      {searchResults.length > 0 && chatWith === "" ? (
        <div className="relative bg-[#ffffff55] backdrop-blur box-border z-10 overflow-y-auto h-[65vh] w-[90vw] max-w-[1000px] border rounded-md">
          {searchResults.map((result, index) => (
            <UserResult
              user={result}
              key={index}
              handleMessage={handleMessageUserFromResult}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center flex-grow-[10] h-auto  max-h-[75vh] overflow-y-auto mx-10 w-[95vw] max-w-[1250px]">
          {messageCards.map((messageCard, index) => (
            <ConversationCard
              key={index}
              messageCard={messageCard}
              setChatWith={setChatWith}
            />
          ))}
        </div>
      )}
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
