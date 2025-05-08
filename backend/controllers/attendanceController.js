const Attendance = require("../models/Attendance");
const User = require("../models/User");

// Faculty saves attendance percentage for a student
const saveAttendancePercentage = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "faculty") {
      return res.status(403).json({ message: "Only faculty can save attendance" });
    }

    const { studentId, percentage, type } = req.body;

    if (!studentId || percentage === undefined || !type) {
      return res.status(400).json({ message: "Student ID, percentage, and type are required" });
    }

    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if attendance record already exists for the student and type
    let attendanceRecord = await Attendance.findOne({ student: studentId, type });

    if (attendanceRecord) {
      // Update existing record
      attendanceRecord.percentage = percentage;
      await attendanceRecord.save();
    } else {
      // Create new record
      attendanceRecord = await Attendance.create({
        student: studentId,
        faculty: req.user._id,
        percentage,
        type,
      });
    }

    res.status(201).json(attendanceRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance records (Faculty can see all students, Students can see their own)
const getAttendanceRecords = async (req, res) => {
  try {
    let records;

    if (req.user.role === "faculty" || req.user.role === "student") {
      // Faculty can see all students' attendance
      records = await Attendance.find().populate("student faculty", "name email");
    } else {
      // Students can see their own attendance
      records = await Attendance.find({ student: req.user._id }).populate("student faculty", "name email");
    }

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveAttendancePercentage, getAttendanceRecords };