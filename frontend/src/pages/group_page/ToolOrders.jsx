/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import GroupService from "../../services/GroupService";
import ToolOrder from "./ToolOrder";
import NewTool from "./NewTool";

const ToolOrders = ({ isRequests, groupName }) => {
  const [toolOrders, setToolOrders] = useState([]);
  const [displayNewTool, setDisplayNewTool] = useState(false);
  const toggleDisplayNewTool = () => {
    setDisplayNewTool(!displayNewTool);
    getOrders();
  };
  const getOrders = async () => {
    try {
      const orders = await GroupService.getTools(groupName);
      setToolOrders(
        orders.filter((e) => {
          e.isRequest === isRequests;
        })
      );
    } catch (error) {
      console.log(error, "eeeee352");
    }
  };
  console.log(toolOrders);

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {toolOrders.map((order) => (
          <ToolOrder
            key={order.id}
            id={order.id}
            toolName={order.toolName}
            imageUrl={order.imageUrl}
            description={order.description}
            isRequest={order.isRequest}
            ownerUsername={order.ownerUsername}
          />
        ))}
      </div>
      <button
        onClick={() => {
          toggleDisplayNewTool();
        }}
        className="fixed bottom-20 right-20 bg-blue-500 hover:bg-blue-700 rounded-full w-16 h-16 p-10 text-white font-bold text-2xl overflow-hidden flex items-center justify-center"
      >
        +
      </button>
      {displayNewTool && (
        <NewTool
          isRequest={isRequests}
          groupName={groupName}
          exit={() => {
            toggleDisplayNewTool();
          }}
        />
      )}
    </>
  );
};

export default ToolOrders;
