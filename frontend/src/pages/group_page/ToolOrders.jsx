/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import GroupService from "../../services/GroupService";
import ToolOrder from "./ToolOrder";
import NewTool from "./NewTool";
import Cookies from "js-cookie";

const ToolOrders = ({ isRequests, groupName }) => {
  const [toolOrders, setToolOrders] = useState([]);
  const [displayNewTool, setDisplayNewTool] = useState(false);

  const toggleDisplayNewTool = () => {
    setDisplayNewTool(!displayNewTool);
    getOrders();
  };
  const getOrders = async () => {
  try {
    const orders = await GroupService.getToolsMock();
    setToolOrders(
      orders.filter((order) => order.isRequest === isRequests)
    );
  } catch (error) {
    console.error(error, "eeeee352");
  }
};

  console.log(toolOrders);

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
    <div className="flex flex-col items-center flex-grow-[10] max-h-[95vh] ">
      <div className="border border-gray-300  mx-10 my-10 w-[95vw] max-w-[1000px] flex-grow-[5] overflow-y-auto">
        {toolOrders.map((order) => (
          <ToolOrder
            key={order.id}
            id={order.id}
            toolName={order.toolName}
            imageUrl={order.imageUrl}
            description={order.description}
            isRequest={order.isRequest}
            owner={order.owner}
          />
        ))}
      </div>
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
