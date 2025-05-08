const express = require("express");
const { uploadTimetable, getTimetables } = require("../controllers/timetableController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload, setUploadType } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, setUploadType("timetable"), upload.single("pdfFile"), uploadTimetable);
router.get("/get", authMiddleware, getTimetables);

module.exports = router;
