const Result = require("../models/Result");
const User = require("../models/User");

// Upload Student Results
const uploadResult = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "faculty") {
      return res.status(403).json({ message: "Only faculty can upload results" });
    }

    const { studentId, semester, percentage } = req.body;

    if (!studentId || !semester || percentage === undefined) {
      return res.status(400).json({ message: "Student ID, semester, and percentage are required" });
    }

    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    const result = await Result.create({
      student: studentId,
      semester,
      percentage,
      uploadedBy: req.user._id,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Student Results
const getResults = async (req, res) => {
  try {
    let results;

    if (req.user.role === "faculty" || req.user.role === "student") {
      // Faculty can see all results
      results = await Result.find().populate("student uploadedBy", "name email").sort({ createdAt: -1 });
    } else {
      // Students can see their own results
      results = await Result.find({ student: req.user._id })
        .populate("uploadedBy student", "name email")
        .sort({ createdAt: -1 });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResult, getResults };