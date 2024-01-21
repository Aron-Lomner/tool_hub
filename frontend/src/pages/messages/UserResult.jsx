/* eslint-disable react/prop-types */
const UserResult = ({ user, handleMessage }) => {
  return (
    <div className="flex flex-row items-center flex-grow-[10] border border-gray-300 w-full">
      <img src={user.imageUrl} className="p-4 w-[80px] h-[80px]" />
      <p className="font-bold text-2xl mx-10">{user.username}</p>
      <button
        onClick={() => {
          handleMessage(user.username);
        }}
        className="bg-blue-500 hover:bg-blue-300 text-white px-2 py-2 rounded-md font-bold shadow-md ml-auto mr-2 mb-2"
      >
        Message
      </button>
    </div>
  );
};

export default UserResult;
