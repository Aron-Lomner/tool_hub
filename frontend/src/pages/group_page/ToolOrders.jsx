/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import GroupService from "../../services/GroupService";
import ToolOrder from "./ToolOrder";
import NewTool from "./NewTool";
import { useNavigate } from "react-router-dom";
import UnauthorizedError from "../../errors/UnauthorizedError";
import { formatDateTimeFromUnixTime } from "../../utils/UtilityFunctions";

const ToolOrders = ({ isRequests, groupName }) => {
  const navigate = useNavigate();
  const [toolOrders, setToolOrders] = useState([]);
  const [displayNewTool, setDisplayNewTool] = useState(false);

  const toggleDisplayNewTool = () => {
    setDisplayNewTool(!displayNewTool);
    getOrders();
  };
  const getOrders = async () => {
    try {
      let orders = await GroupService.getTools(groupName);
      orders = orders
        .filter((order) => order.request === isRequests)
        .sort((a, b) => a.date - b.date);
      setToolOrders(orders);
      console.log("Tools: ", orders);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      } else {
        console.log("Error!", error);
      }
    }
  };

  console.log(toolOrders, "--toolorder");

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
              request={order.request}
              date={formatDateTimeFromUnixTime(order.date)}
              ownerUsername={order.ownerUsername}
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
