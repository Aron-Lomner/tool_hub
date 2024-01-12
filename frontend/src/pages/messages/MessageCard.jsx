/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const MessageCard = ({ messageCard }) => {
    const { unread, userName, message, imageUrl } = messageCard;
  
    return (
      <button className="w-screen hover:bg-gray-100">
        <div className="flex flex-row h-20">
        {unread}
        {imageUrl && <img src={imageUrl} alt="Image" className="p-4 w-20"/>}
        <div>
          <p className="font-bold text-xl">{userName}</p>
          <p className="text-gray-600"><i>{message}</i></p>
          </div>
        </div>
      </button>
    );
  };
  
  export default MessageCard;
  