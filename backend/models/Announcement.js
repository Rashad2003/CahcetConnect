const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    department: { type: String, enum: ["IT", "CSE", "ECE", "MECH", "All"], default: "All" }, // College-wide or department-specific
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);
