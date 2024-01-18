import ProfileTools from "./ProfileTools";

const ToolOffersRequests = () => {
  return (
    <div>
      <h1 className="text-4xl flex justify-center text-center">
        <div>Tool&nbsp;</div>
        <div className="text-blue-500">Offers</div> <div>/</div>
        <div className="text-green-500">Requests</div>
      </h1>
      <div className="flex flex-col">
        <ProfileTools />
      </div>
    </div>
  );
};

export default ToolOffersRequests;
