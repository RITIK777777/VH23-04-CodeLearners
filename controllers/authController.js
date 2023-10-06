const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user with the hashed password
    const user = new User({ name, email, password: hashedPassword });
    const userRegister = await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: userRegister._id },
      process.env.SESSION_SECRET
    );

    return res
      .status(201)
      .json({ success: true, message: "User Registered Successfully", token });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in Registration",
      error: error.message,
    });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET);

    return res
      .status(200)
      .json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in Login",
      error: error.message,
    });
  }
});

// Update User Profile
router.post(
  (updateUserProfile = async (req, res) => {
    try {
      const { educationalBackground, interests } = req.body;
      const userId = req.user.userId; // Extracted from the JWT token in the authentication middleware

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            educationalBackground: educationalBackground || "",
            interests: interests || [],
          },
        },
        { new: true }
      );

      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({
        success: false,
        message: "Error updating user profile",
        error: error.message,
      });
    }
  })
);
