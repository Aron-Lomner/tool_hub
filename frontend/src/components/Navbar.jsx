import { Link } from "react-router-dom";
import RegisterLoginService from "../services/RegisterLoginService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Branding */}
        <Link to="/" className="text-white text-lg font-semibold">
          Your Logo/Brand
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/home" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/find-groups" className="text-white hover:text-gray-300">
            Find Groups
          </Link>
          <Link to="/my-offers" className="text-white hover:text-gray-300">
            My Offers
          </Link>
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
