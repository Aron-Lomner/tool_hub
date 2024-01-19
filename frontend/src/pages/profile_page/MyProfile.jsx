import Navbar from "../../components/Navbar";
import ProfileInfo from "./ProfileInfo";
import ToolOffersRequests from "./ToolOffersRequests";

const MyProfile = () => {
  return (
    <div className="bg-[url('/src/assets/Background.jpg')] bg-cover bg-no-repeat bg-center min-h-screen bg-opacity-[80%]">
      <Navbar />
      <div className="flex flex-wrap justify-evenly">
        <ProfileInfo />
        <ToolOffersRequests />
      </div>
    </div>
  );
};

export default MyProfile;
