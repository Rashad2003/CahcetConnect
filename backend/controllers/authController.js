const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department,reg } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role, department, reg });

    if (user) {
      res.status(201).json({
        reg:reg,
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userData = {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        token: generateToken(user.id),
      };
      
      res.json(userData);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { reg, department } = req.body;

    // Find user by MongoDB user ID and department
    const user = await User.findOne({ reg:reg , department });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Ensure the user is a student
    if (user.role !== "student") {
      return res.status(403).json({ message: "Only students can log in with this method" });
    }

    // Return user data
    const userData = {
      reg:reg,
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      token: generateToken(user.id),
    };

    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("name email department");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser, loginStudent, getUserProfile, getStudents };
