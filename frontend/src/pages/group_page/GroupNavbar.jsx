/* eslint-disable react/prop-types */
const GroupNavbar = ({ setNavIndex, navIndex, setDisplayGroupPage }) => {
  const tabs = ["Home", "Messages", "Tool Requests", "Tool Offers"];
  return (
    <div className="w-fit border-[2px] border-blue-500">
      {/* <button className="px-2 text-xl font-bold border-l-[2px] bg-white text-blue-500 hover:bg-blue-200">
        <span className="text-2xl">&#8592;</span>
      </button> */}
      {tabs.map((tab, index) => {
        return (
          <button
            key={index}
            className={
              "p-2 text-xl font-bold  border-blue-500 " +
              (navIndex === index
                ? " text-white bg-blue-500 "
                : " bg-white text-blue-500 hover:bg-blue-200 hover:text-white ") +
              (index === 0 ? " border-l-0" : "border-l-[2px]")
            }
            onClick={() => {
              if (index === 0) {
                setDisplayGroupPage("");
              } else {
                setNavIndex(index);
              }
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default GroupNavbar;
