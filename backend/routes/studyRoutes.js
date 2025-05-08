const express = require("express");
const { uploadStudyMaterial, getStudyMaterials } = require("../controllers/studyController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload, setUploadType } = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload Study Material (Only Faculty)
router.post("/add",authMiddleware, setUploadType("studyMaterial"), upload.single("pdfFile"), uploadStudyMaterial);

// Get Study Materials
router.get("/get", authMiddleware, getStudyMaterials);

module.exports = router;
