/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import GroupService from "../../services/GroupService";
import ProfileToolCard from "./ProfileToolCard";

const ProfileTools = () => {
    const [myOrders, setToolOrders] = useState([]);

const getOrders = async () => {
  try {
    const orders = await GroupService.getToolsMock();
    setToolOrders(orders);
  } catch (error) {
    console.error(error, "eeeee352");
  }
};

console.log(myOrders)

useEffect(() => {
    getOrders();
  }, []);

return (
    <div>
<div className="border border-gray-300  mx-10 my-10 w-[55vw] max-w-[800px] flex-grow-[5] overflow-y-auto h-[70vh]">
        {myOrders.map((order) => (
          <ProfileToolCard
            key={order.id}
            id={order.id}
            toolName={order.toolName}
            imageUrl={order.imageUrl}
            description={order.description}
            isRequest={order.isRequest}
            owner={order.owner}
            groupName={order.groupName}
          />
        ))}
      </div>
    </div>
)
}

export default ProfileTools