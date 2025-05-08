import { motion } from "framer-motion";
import { MdLogout } from "react-icons/md";
import {useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const logout = () =>{
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and College Name */}
          <div className="flex items-center space-x-2">
            {/* Replace "logo.png" with your actual logo file */}
            <img
              src="/logo.png" // Path to your logo
              alt="CAHCET Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-2xl font-bold text-sky-800">CAHCET Connect</span>
          </div>
          {token && (
          <div>
          <MdLogout className="border bg-white rounded-full text-sky-800 p-1 w-[35px] h-[35px] md:p-2 md:w-[50px] md:h-[50px]" onClick={logout}/>
          </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;