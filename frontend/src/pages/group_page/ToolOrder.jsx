/* eslint-disable react/prop-types */
const ToolOrder = ({
  // eslint-disable-next-line no-unused-vars
  id,
  toolName,
  imageUrl,
  description,
  isRequest,
  owner,
}) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      <div className="flex items-center mb-2">
        <img
          src={imageUrl}
          alt={`${toolName} image`}
          className="w-10 h-10 rounded-full object-cover mr-2"
        />
        <span className="text-lg font-semibold">{toolName}</span>
      </div>

      <p className="text-gray-600 mb-2">{description}</p>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Posted by: {owner}
        </span>

        {isRequest ? (
          <span className="text-green-500 font-semibold">Request</span>
        ) : (
          <span className="text-blue-500 font-semibold">Offer</span>
        )}
      </div>
    </div>
  );
};

export default ToolOrder;
