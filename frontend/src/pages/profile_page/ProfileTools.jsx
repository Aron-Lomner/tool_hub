/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import GroupService from "../../services/GroupService";
import ProfileToolCard from "./ProfileToolCard";
import { formatDateTimeFromUnixTime } from "../../utils/UtilityFunctions";
const ProfileTools = () => {
  const [myOrders, setToolOrders] = useState([]);

  const getOrders = async () => {
    try {
      let orders = await GroupService.getUserTools();
      orders = orders.data.sort((a, b) => a.date - b.date);
      setToolOrders(orders);
    } catch (error) {
      console.error(error, "eeeee352");
    }
  };

  console.log(myOrders);

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
            isRequest={order.request}
            groupName={order.groupName}
            date={formatDateTimeFromUnixTime(order.date)}
            refresh={getOrders}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileTools;
