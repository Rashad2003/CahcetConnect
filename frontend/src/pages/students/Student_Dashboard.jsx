import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBullhorn, FaCalendarAlt, FaChartLine, FaBookOpen, FaAddressCard } from "react-icons/fa";

const Student_Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Dashboard card data
  const cards = [
    {
      title: "Announcements",
      icon: <FaBullhorn className="w-8 h-8 text-sky-600" />,
      link: "/student/announcements",
      bgColor: "bg-sky-50",
      hoverColor: "hover:bg-sky-100",
    },
    {
      title: "Timetables",
      icon: <FaCalendarAlt className="w-8 h-8 text-green-600" />,
      link: "/student/timetables",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      title: "Results",
      icon: <FaChartLine className="w-8 h-8 text-yellow-600" />,
      link: "/student/results",
      bgColor: "bg-yellow-50",
      hoverColor: "hover:bg-yellow-100",
    },
    {
      title: "Study Materials",
      icon: <FaBookOpen className="w-8 h-8 text-red-600" />,
      link: "/student/study-materials",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100",
    },
    {
      title: "Attendance",
      icon: <FaAddressCard className="w-8 h-8 text-purple-600" />,
      link: "/student/attendance",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen mt-15 bg-gradient-to-br from-sky-50 to-sky-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-sky-800">Welcome, {user?.name}</h1>
          <p className="text-lg text-sky-600">Student Dashboard</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${card.bgColor} ${card.hoverColor} p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300`}
            >
              <Link to={card.link} className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-white rounded-full shadow-sm">{card.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Student_Dashboard;