/* eslint-disable react/prop-types */
const GroupNavbar = ({ setNavIndex, navIndex, setDisplayGroupPage }) => {
  const tabs = ["Home", "Messages", "Tool Requests", "Tool Offers"];

  return (
    <div className="w-fit bg-[#ffffff79] backdrop-blur box-border border-white border-[2px] p-4 shadow-md">
      {/* <button className="px-2 text-xl font-bold border-l-[2px] bg-white text-blue-500 hover:bg-blue-200">
        <span className="text-2xl">&#8592;</span>
      </button> */}
      {tabs.map((tab, index) => {
        console.log("Index: ", navIndex, " : ", index);
        return (
          <button
            key={index}
            className={
              "p-2 text-xl font-bold  border-blue-500 " +
              (navIndex === index
                ? "  bg-violet-700 text-white "
                : " bg-white text-violet-700 hover:bg-violet-95hover:text-white ") +
              (index === 0 ? " border-l-0" : " border-l-[2px]")
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
