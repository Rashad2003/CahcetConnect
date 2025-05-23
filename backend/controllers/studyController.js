const StudyMaterial = require("../models/StudyMaterial");

// Upload Study Material
const uploadStudyMaterial = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "faculty") {
      return res.status(403).json({ message: "Only faculty can upload study materials" });
    }

    const { title, department, year } = req.body;
    const pdfFile = req.file ? req.file.path : null;

    if (!pdfFile) {
      return res.status(400).json({ message: "Please upload a PDF file" });
    }

    const studyMaterial = await StudyMaterial.create({
      title,
      department,
      year, // Add year field
      pdfFile,
      uploadedBy: req.user._id,
    });

    res.status(201).json(studyMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Study Materials (Filtered by department and year)
const getStudyMaterials = async (req, res) => {
  try {
    let materials;

    if (req.user.role === "faculty" || req.user.role === "student") {
      // If user is in "All" department, fetch everything
      materials = await StudyMaterial.find().sort({ createdAt: -1 });
    } else {
      // Otherwise, fetch materials for the user's department + "All"
      materials = await StudyMaterial.find({
        $or: [{ department: "All" }, { department: req.user.department }],
      }).sort({ createdAt: -1 });
    }

    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadStudyMaterial, getStudyMaterials };