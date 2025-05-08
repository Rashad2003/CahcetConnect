const ExamTimetable = require("../models/ExamTimetable");

// Upload Exam Timetable
const uploadTimetable = async (req, res) => {
  try {
    const { title, department, year, section, examType } = req.body;
    const pdfFile = req.file ? req.file.path : null;

    if (!pdfFile) {
      return res.status(400).json({ message: "Please upload a PDF file" });
    }

    const timetable = await ExamTimetable.create({
      title,
      department,
      year,
      section,
      examType,
      pdfFile,
      uploadedBy: req.user._id,
    });

    res.status(201).json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

// Get Exam Timetables (Filtered by department and year)
const getTimetables = async (req, res) => {
  try {
    let timetables;

    if (req.user.role === "faculty") {
      // If user is in "All" department, fetch everything
      timetables = await ExamTimetable.find().sort({ createdAt: -1 });
    } else {
      // Otherwise, fetch timetables for the user's department + "All"
      timetables = await ExamTimetable.find({
        $or: [{ department: "All" }, { department: req.user.department }],
      }).sort({ createdAt: -1 });
    }

    res.json(timetables);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { uploadTimetable, getTimetables };