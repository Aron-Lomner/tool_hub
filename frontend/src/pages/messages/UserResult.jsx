/* eslint-disable react/prop-types */
const UserResult = ({ user, handleMessage }) => {
  return (
    <div className="flex flex-row items-center flex-grow-[10] border border-gray-300 w-full bg-[#ffffff55] backdrop-blur box-border">
      <img src={user.imageUrl} className="p-4 w-[80px] h-[80px]" />
      <p className="font-bold text-2xl mx-10 text-violet-700">{user.username}</p>
      <button
        onClick={() => {
          handleMessage(user.username);
        }}
        className="bg-violet-700 hover:bg-violet-950 text-white px-2 py-2 rounded-md font-bold shadow-md ml-auto mr-2 mb-2 transition-transform transform-gpu hover:scale-105"
      >
        Message
      </button>
    </div>
  );
};

export default UserResult;
