const express = require("express");
const { registerUser, loginUser, getUserProfile, getStudents, loginStudent } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/students", getStudents);
router.post("/student", loginStudent);


module.exports = router;
