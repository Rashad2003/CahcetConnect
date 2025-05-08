const express = require("express");
const { saveAttendancePercentage, getAttendanceRecords } = require("../controllers/attendanceController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Faculty saves attendance percentage
router.post("/add", authMiddleware, saveAttendancePercentage);

// Get attendance records
router.get("/get", authMiddleware, getAttendanceRecords);

module.exports = router;