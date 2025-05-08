const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    percentage: { type: Number, required: true, min: 0, max: 100 }, // Attendance percentage
    type: { type: String, enum: ["CAT1", "CAT2", "Final"], required: true }, // New field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);