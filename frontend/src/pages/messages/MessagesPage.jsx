import MessageBody from "./MessageBody";
import Navbar from "../../components/Navbar";

const MessagesPage = () => {
  return (<div className="bg-[url('/src/assets/Background.jpg')] bg-cover bg-no-repeat bg-center min-h-screen bg-opacity-[80%]">
  <Navbar/>
  <MessageBody/>
  </div>
  );
};

export default MessagesPage;
