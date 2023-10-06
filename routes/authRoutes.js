// routes/authRoutes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware");
const User = require("../models/user");

const router = express.Router();

// Registration
router.post("/register", authController);

// Login
router.post("/login", authController);

// Protected Route
router.get("/protected", requireAuth, (req, res) => {
  res.json({
    success: true,
    message: "You have access to this protected route",
  });
});

// Get user profile
router.get("/user-profile/:id", requireAuth, async (req, res) => {
  try {
    // ... (unchanged)

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message,
    });
  }
});

// Update user profile
router.put("/update-profile/:id", requireAuth, async (req, res) => {
  try {
    // ... (unchanged)

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error updating user profile",
      error: error.message,
    });
  }
});

module.exports = router;
