const express = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware"); // Import the authentication middleware

const router = express.Router();

// Registration
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Protected Route
router.get("/protected", requireAuth, (req, res) => {
  res.json({
    success: true,
    message: "You have access to this protected route",
    user: req.user, // The user object is added to the request by the authentication middleware
  });
});

// Get user profile
router.get("/user-profile/:id", requireAuth, authController.getUserProfile);

// Update user profile
router.put(
  "/update-profile/:id",
  requireAuth,
  authController.updateUserProfile
);

module.exports = router;
