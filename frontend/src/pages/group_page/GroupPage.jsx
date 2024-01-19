/* eslint-disable react/prop-types */
import { useState } from "react";
import GroupNavbar from "./GroupNavbar";
import ToolOrders from "./ToolOrders";
import GroupMessage from "./GroupMessage";

const GroupPage = ({ groupName, setDisplayGroupPage }) => {
  const [navIndex, setNavIndex] = useState(1);

  return (
    <div className="h-[100%] bg-white flex flex-col max-h-[100%]">
      <div className="flex justify-center">
        <GroupNavbar
          setNavIndex={setNavIndex} setDisplayGroupPage={setDisplayGroupPage}
        />
      </div>
      {navIndex === 1 && <GroupMessage groupName={groupName} />}
      {navIndex === 2 && <ToolOrders groupName={groupName} isRequests={true} />}
      {navIndex === 3 && (
        <ToolOrders groupName={groupName} isRequests={false} />
      )}
    </div>
  );
};

export default GroupPage;
