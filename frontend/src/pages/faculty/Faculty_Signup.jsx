import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaLock, Fa500Px } from "react-icons/fa";

const Faculty_Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

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
      // 🔥 Send data to MongoDB Backend
      await axios.post("http://localhost:5000/api/faculty/register", {
        name,
        email,
        password, // Still storing in MongoDB for non-Firebase logins
        role: "faculty",
        department,
      });

      navigate("/faculty/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
      <motion.div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-sky-800 mb-6 text-center">Create Faculty Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative">
          <Fa500Px className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-sky-600 text-white py-3 rounded-lg">
            Sign Up
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Faculty_Signup;
