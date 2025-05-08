import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBullhorn, FaCalendarAlt } from "react-icons/fa";

const SAnnouncements = () => {
  const token = localStorage.getItem('token');
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(res.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  return (
    <div className="min-h-screen mt-15 bg-gradient-to-br from-sky-50 to-sky-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-sky-800 flex items-center gap-2">
            <FaBullhorn className="text-sky-600" /> Announcements
          </h1>
        </div>

        <div className="space-y-4">
          {announcements.length === 0 ? (
            <p className="text-center text-gray-600">No announcements yet.</p>
          ) : (
            announcements.map((ann) => (
              <motion.div
                key={ann._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-sky-800">{ann.title}</h3>
                <p className="text-gray-600 mt-2">{ann.message}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <FaCalendarAlt />
                  <span>{new Date(ann.createdAt).toLocaleString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SAnnouncements;