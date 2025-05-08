import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaBook, FaChalkboardTeacher, FaAddressCard, FaIdCard, FaPhone, FaCalendar, FaUsers } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";

const Student_Signup = () => {
  const {backendUrl} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [register, setRegister] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user.role === 'student') {
      navigate('/student/dashboard'); // Redirect to dashboard if token exists
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendUrl + "/api/student/register", { 
        name, 
        email, 
        password,  
        department,
        register,
        dob,
        phone,
        section,
        year,
      });
      navigate("/student/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl" // Increased max-width
      >
        <h2 className="text-3xl font-bold text-sky-800 mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Two-column grid */}
            {/* Column 1 */}
            <div className="space-y-6">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              <div className="relative">
                <FaAddressCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Department</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="CS">CS</option>
                  <option value="MECH">MECH</option>
                </select>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                  type="text"
                  placeholder="Registration Number"
                  value={register}
                  onChange={(e) => setRegister(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                  type="date"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="">Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="relative">
                <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/student/login")}
            className="text-sky-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Student_Signup;