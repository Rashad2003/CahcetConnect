import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaPercentage } from "react-icons/fa";

const SAttendance = () => {
  const token = localStorage.getItem('token');
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchAttendanceRecords();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
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
        <h1 className="text-3xl font-bold text-sky-800 flex items-center gap-2 mb-8">
          <FaPercentage className="text-sky-600" /> Attendance
        </h1>

        {/* Attendance Records */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold text-sky-800 mb-4">Attendance Records</h2>
          <div className="space-y-2">
            {records.length === 0 ? (
              <p className="text-center text-gray-600">No records found.</p>
            ) : (
              records.map((record) => (
                <div
                  key={record._id}
                  className="flex justify-between items-center bg-sky-50 p-3 rounded-lg"
                >
                  <span className="text-gray-800">
                    {record.student.name} - {record.percentage}% ({record.type})
                  </span>
                  <span className="text-gray-600 hidden md:block">By {record.faculty.name}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SAttendance;