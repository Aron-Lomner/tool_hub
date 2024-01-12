import { Link } from "react-router-dom";
import RegisterLoginService from "../services/RegisterLoginService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const links = [
    ["/home", "Home"],
    ["/find-groups", "Find Groups"],
    ["/messages", "Messages"],
    ["/my-offers", "My Offers"],
  ];
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Branding */}
        <Link to="/" className="text-white text-lg font-semibold">
          Your Logo/Brand
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                to={link[0]}
                className="text-white hover:text-gray-300"
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
            className="text-white hover:text-gray-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
