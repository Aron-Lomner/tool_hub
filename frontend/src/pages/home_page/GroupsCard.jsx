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
      className=" shadow-md border-sky-200 border-[2px] cursor-pointer h-32 w-full flex mt-5 list-none"
    >
      <img
        src={imageUrl}
        alt="group image"
        className="m-4 object-cover rounded-full aspect-square"
      />

      <div className="flex flex-col justify-evenly">
        <h3 className="font-roboto text-2xl font-bold text-[#484bff]">
          {name}
        </h3>
        <p className=" m-0 w-full text-30638e">
          {clipDescription(description, 200)}
        </p>
      </div>
    </li>
  );
};
export default GroupsCard;
