const Announcement = require("../models/Announcement");

// Create Announcement
const createAnnouncement = async (req, res) => {
  try {
    const { title, message, department } = req.body;

    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const announcement = await Announcement.create({
      title,
      message,
      department,
      createdBy: req.user._id,
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Announcements (Filtered by department)
const getAnnouncements = async (req, res) => {
  try {
    let announcements;
    console.log("user department : ", req.user.department)

    if (req.user.role === "faculty") {
      // If user is in "All" department, fetch everything
      announcements = await Announcement.find().sort({ createdAt: -1 });
    } else {
      // Otherwise, fetch announcements for the user's department + "All"
      announcements = await Announcement.find({
        $or: [{ department: "All" }, { department: req.user.department }],
      }).sort({ createdAt: -1 });
    }

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createAnnouncement, getAnnouncements };
