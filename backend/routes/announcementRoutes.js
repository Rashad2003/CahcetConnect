const express = require("express");
const { createAnnouncement, getAnnouncements } = require("../controllers/announcementController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/add", authMiddleware, createAnnouncement);
router.get("/get", authMiddleware, getAnnouncements);

module.exports = router;
