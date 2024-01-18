import ProfileTools from "./ProfileTools";

const ToolOffersRequests = () => {
  return (
    <div>
      <h1 className="text-4xl flex justify-center text-center font-bold mt-16 bg-[#96a5fa01] backdrop-blur-sm text-white">
        <div>Tool&nbsp;</div>
        <div className="text-violet-700">Offers</div> <div>/</div>
        <div className="text-green-600">Requests</div>
      </h1>
      <div className="flex flex-col">
        <ProfileTools />
      </div>
    </div>
  );
};

export default ToolOffersRequests;
