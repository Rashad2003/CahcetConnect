const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate result with a student
    semester: { type: String, required: true }, // Example: "Semester 1"
    percentage: { type: Number, required: true, min: 0, max: 100 }, // Student's percentage
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Faculty who uploaded the result
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", ResultSchema);