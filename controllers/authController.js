const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

const authController = {
  // Registration
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user
      const newUser = new User({ name, email, password: hashedPassword });
      const savedUser = await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
      });
    } catch (error) {
      console.error("Error in registration:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  // Login
  login: async (req, res) => {
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
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return res
        .status(200)
        .json({ success: true, message: "Login successful", token, user });
    } catch (error) {
      console.error("Error in login:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const userId = req.params.id;

      // Verify user ID from token
      if (req.user.userId !== userId) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized: Invalid user ID" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  updateUserProfile: async (req, res) => {
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
      console.error("Error in updateUserProfile:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = authController;
