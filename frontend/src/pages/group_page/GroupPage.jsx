/* eslint-disable react/prop-types */
import { useState } from "react";
import GroupNavbar from "./GroupNavbar";
import ToolOrders from "./ToolOrders";

const GroupPage = ({ groupName, setDisplayGroupPage }) => {
  const [navIndex, setNavIndex] = useState(0);

  return (
    <div className="z-30 fixed top-0 left-0 w-screen h-screen bg-white">
      <div className="flex justify-center">
        <GroupNavbar
          setNavIndex={setNavIndex}
          navIndex={navIndex}
          setDisplayGroupPage={setDisplayGroupPage}
        />
        {navIndex === 2 && (
          <ToolOrders groupName={groupName} isRequests={true} />
        )}
        {navIndex === 3 && (
          <ToolOrders groupName={groupName} isRequests={false} />
        )}
      </div>
    </div>
  );
};

export default GroupPage;
