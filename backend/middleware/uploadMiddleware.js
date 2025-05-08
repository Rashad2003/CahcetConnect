const multer = require("multer");
const path = require("path");

// Dynamic storage based on file type
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadFolder = "uploads/"; // Default

    if (req.uploadType === "timetable") uploadFolder += "timetables/";
    else if (req.uploadType === "result") uploadFolder += "results/";
    else if (req.uploadType === "studyMaterial") uploadFolder += "studyMaterials/";

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter (Only accept PDFs)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Middleware to dynamically set upload type
const setUploadType = (uploadType) => (req, res, next) => {
  req.uploadType = uploadType;
  next();
};

const upload = multer({ storage, fileFilter });

module.exports = { upload, setUploadType };
