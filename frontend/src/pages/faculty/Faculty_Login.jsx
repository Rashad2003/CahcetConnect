import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const Faculty_Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {backendUrl} = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user.role === 'faculty') {
      navigate('/faculty/dashboard'); // Redirect to dashboard if token exists
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + "/api/faculty/login", { email, password });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setToken(res.data.token);
        navigate('/faculty/dashboard');
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-sky-800 mb-6 text-center">Welcome Back Faculty!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/faculty/signup")}
            className="text-sky-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Faculty_Login;