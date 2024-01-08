/* eslint-disable react/prop-types */
import { useState } from "react";
import GroupNavbar from "./GroupNavbar";
import ToolOrders from "./ToolOrders";
import MessageBody from "./MessageBody";

const GroupPage = ({ groupName, setDisplayGroupPage }) => {
  const [navIndex, setNavIndex] = useState(0);

  return (
    <div className="z-30 fixed top-0 left-0 w-screen h-screen bg-white pb- 10 bottom-10">
      <div className="flex justify-center">
        <GroupNavbar
          setNavIndex={setNavIndex}
          navIndex={navIndex}
          setDisplayGroupPage={setDisplayGroupPage}
        />
        </div>
        {navIndex === 1 && (
          <MessageBody groupName={groupName}/>
        )}
        {navIndex === 2 && (
          <ToolOrders groupName={groupName} isRequests={true} />
        )}
        {navIndex === 3 && (
          <ToolOrders groupName={groupName} isRequests={false} />
        )}
      
    </div>
  );
};

export default GroupPage;
