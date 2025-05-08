const express = require("express");
const { uploadResult, getResults } = require("../controllers/resultController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload, setUploadType } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, setUploadType("result"), upload.single("pdfFile"), uploadResult);
router.get("/get", authMiddleware, getResults);

module.exports = router;
