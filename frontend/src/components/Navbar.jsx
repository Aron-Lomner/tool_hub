import { Link } from "react-router-dom";
import RegisterLoginService from "../services/RegisterLoginService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const links = [
    ["/home", "Home"],
    ["/find-groups", "Find Groups"],
    ["/messages", "Messages"],
    ["/my-profile", "My Profile"],
  ];
  return (
    <nav className="bg-[#ffffff55] backdrop-blur box-border border-white border-[2px] p-4 shadow-md ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Branding */}
        <Link to="/" className="">
          <img src="/src/assets/ToolHub.png" alt="" className="w-[60px] transition-transform transform-gpu hover:scale-105"/>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                to={link[0]}
                className="text-violet-700 font-semibold text-lg hover:text-violet-950 transition-transform transform-gpu hover:scale-105"
              >
                {link[1]}
              </Link>
            );
          })}

          <button
            onClick={() => {
              RegisterLoginService.logout();
              navigate("/");
            }}
            className="text-violet-700 font-bold text-xl hover:text-violet-950"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
