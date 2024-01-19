import MessageBody from "./MessageBody";
import Navbar from "../../components/Navbar";

const MessagesPage = () => {
  return (<div className="h-screen bg-[url('/src/assets/bg4.jpg')]">
  <Navbar/>
  <MessageBody/>
  </div>
  );
};

export default MessagesPage;
