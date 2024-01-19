/* eslint-disable react/prop-types */

const GroupsCard = ({ group, setDisplayGroupPage }) => {
  const { description, name, imageUrl } = group;
  const clipDescription = (str, max) => {
    if (str != null && str.length > max) {
      return str.slice(0, max - 3) + "...";
    }
    return str;
  };
  return (
    <li
      onClick={() => {
        setDisplayGroupPage(name);
      }}
      className=" shadow-md bg-[#ffffff77] backdrop-blur border-white border-2 rounded-lg box-border cursor-pointer h-32 w-full flex mt-5 list-none transition-transform transform-gpu hover:scale-105 hover:bg-white"
    >
      <img
        src={imageUrl}
        alt="group image"
        className="m-4 object-cover rounded-full aspect-square"
      />

      <div className="flex flex-col justify-evenly text-violet-700 ">
        <h3 className="font-roboto text-2xl font-bold ">
          {name}
        </h3>
        <p className=" m-0 w-full text-30638e truncate max-w-xs">
          {clipDescription(description, 200)}
        </p>
      </div>
    </li>
  );
};
export default GroupsCard;
