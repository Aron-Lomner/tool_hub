import Navbar from "../../components/Navbar";
import ProfileInfo from "./ProfileInfo";
import ToolOffersRequests from "./ToolOffersRequests";

const MyProfile = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-around">
<ProfileInfo/>
<ToolOffersRequests/>
      </div>
    </div>
  );
};

export default MyProfile;
