import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBookOpen, FaUpload, FaFolder, FaFolderOpen } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";

const StudyMaterials = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem('token');
  const {backendUrl} = useContext(AuthContext);
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("1"); // Default to 1st year
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedYears, setExpandedYears] = useState({}); // Track expanded/collapsed state

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/studyMaterials/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(res.data);
    } catch (error) {
      console.error("Error fetching study materials:", error);
    }
  };

  const handleUploadMaterial = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file");

    setLoading(true);
    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("title", title);
    formData.append("department", department);
    formData.append("year", year); // Add year field

    try {
      await axios.post(backendUrl + "/api/studyMaterials/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setDepartment("All");
      setYear("1"); // Reset year to default
      setFile(null);
      fetchMaterials();
    } catch (error) {
      console.error("Error uploading study material:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group materials by year
  const groupedMaterials = materials.reduce((acc, material) => {
    if (!acc[material.year]) {
      acc[material.year] = [];
    }
    acc[material.year].push(material);
    return acc;
  }, {});

  // Toggle expanded state for a year
  const toggleYear = (year) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year], // Toggle the expanded state
    }));
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
          <FaBookOpen className="text-sky-600" /> Study Materials
        </h1>

        {/* Upload Study Material Form (Faculty Only) */}
        {user.role === "faculty" && (
          <motion.form
            onSubmit={handleUploadMaterial}
            className="bg-white p-6 rounded-2xl shadow-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-sky-800 mb-4">Upload New Study Material</h2>
            <input
              className="w-full p-3 mb-4 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="w-full p-3 mb-4 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>
            <select
              className="w-full p-3 mb-4 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            <div className="flex items-center gap-2 mb-4">
              <input
                className="w-full p-3 rounded-lg border border-sky-300 focus:border-sky-500 focus:outline-none"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition duration-300 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <FaUpload /> {loading ? "Uploading..." : "Upload Study Material"}
            </button>
          </motion.form>
        )}

        {/* Study Materials List (Grouped by Year) */}
        <div className="space-y-6">
          {Object.keys(groupedMaterials).length === 0 ? (
            <p className="text-center text-gray-600">No study materials available.</p>
          ) : (
            Object.keys(groupedMaterials).map((year) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                {/* Year Folder Header */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleYear(year)}
                >
                  <h2 className="text-2xl font-bold text-sky-800 flex items-center gap-2">
                    {expandedYears[year] ? (
                      <FaFolderOpen className="text-sky-600" />
                    ) : (
                      <FaFolder className="text-sky-600" />
                    )}
                    {year} Year
                  </h2>
                  <span className="text-sky-600">
                    {expandedYears[year] ? "▼" : "▶"}
                  </span>
                </div>

                {/* Study Materials List (Conditionally Rendered) */}
                {expandedYears[year] && (
                  <div className="mt-4 space-y-4">
                    {groupedMaterials[year].map((material) => (
                      <div key={material._id} className="bg-sky-50 p-4 rounded-lg">
                        <h3 className="text-xl font-bold text-sky-800">{material.title}</h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <span>📅 {new Date(material.createdAt).toLocaleString()}</span>
                        </div>
                        <a
                          href={`http://localhost:5000/${material.pdfFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition duration-300"
                        >
                          View Study Material 📄
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StudyMaterials;