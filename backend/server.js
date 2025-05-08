const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const path = require("path");
const attendanceRoutes = require("./routes/attendanceRoutes");
const resultRoutes = require("./routes/resultRoutes");
const studyRoutes = require("./routes/studyRoutes");
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/studyMaterials", studyRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/faculty', facultyRoutes);

// Serve uploaded PDFs
app.use("/uploads/timetables", express.static(path.join(__dirname, "uploads/timetables")));
app.use("/uploads/results", express.static(path.join(__dirname, "uploads/results")));
app.use("/uploads/studyMaterials", express.static(path.join(__dirname, "uploads/studyMaterials")));

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=> res.send("API Working!"));

app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
