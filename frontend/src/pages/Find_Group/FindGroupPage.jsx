import Navbar from "../../components/Navbar";
import SearchBody from "./SearchBody";



const FindGroupPage = () => {
    
    return (
      <div className="bg-[url('/src/assets/Background.jpg')] bg-cover bg-no-repeat bg-center min-h-screen bg-opacity-[80%] text-center">
      
        <Navbar/>
        <h1 className="text-4xl text-center font-bold mt-16 mb-5 bg-[#96a5fa01] backdrop-blur-sm text-white inline-block">Find Groups</h1>
        <SearchBody/>
      </div>
    );
  };
  
  export default FindGroupPage;
  