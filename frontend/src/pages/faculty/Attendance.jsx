import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaPercentage } from "react-icons/fa";

const Attendance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem('token');
  const [students, setStudents] = useState([]);
  const [percentages, setPercentages] = useState({});
  const [types, setTypes] = useState({}); // New state for types
  const [loading, setLoading] = useState(false);
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
      console.log(res.data);
      setRecords(res.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleSaveAttendance = async () => {
    setLoading(true);
    try {
      const attendanceEntries = Object.keys(percentages).map((studentId) => ({
        studentId,
        percentage: percentages[studentId],
        type: types[studentId], // Include type
      }));
      console.log("Sending attendance entries:", attendanceEntries);

      for (let entry of attendanceEntries) {
        await axios.post("http://localhost:5000/api/attendance/add", entry, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      fetchAttendanceRecords();
      setPercentages({});
      setTypes({});
    } catch (error) {
      console.error("Error saving attendance:", error);
    } finally {
      setLoading(false);
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

        {/* Save Attendance (Faculty Only) */}
        {user.role === "faculty" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg mb-8 overflow-x-auto"
          >
            <h2 className="text-xl font-semibold text-sky-800 mb-4">Save Attendance Percentage</h2>
            <div className="space-y-2">
              {students.length === 0 ? (
                <p className="text-center text-gray-600">No students found.</p>
              ) : (
                students.map((student) => (
                  <div
                    key={student._id}
                    className="flex justify-between items-center bg-sky-50 p-3 rounded-lg gap-[1rem]"
                  >
                    <span className="text-gray-800">{student.name}</span>
                    <div className="flex items-center gap-2">
                      <select
                        className="p-2 bg-white rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                        value={types[student._id] || ""}
                        onChange={(e) =>
                          setTypes({ ...types, [student._id]: e.target.value })
                        }
                      >
                        <option value="">Select Type</option>
                        <option value="CAT1">CAT1</option>
                        <option value="CAT2">CAT2</option>
                        <option value="Final">Final</option>
                      </select>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="p-2 bg-white rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                        value={percentages[student._id] || ""}
                        onChange={(e) =>
                          setPercentages({ ...percentages, [student._id]: e.target.value })
                        }
                        placeholder="Percentage"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={handleSaveAttendance}
              className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition duration-300 mt-4"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Attendance"}
            </button>
          </motion.div>
        )}

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
                  <span className="text-gray-600 hidden md:block">By {record.faculty?.name}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Attendance;