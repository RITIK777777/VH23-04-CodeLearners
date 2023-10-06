// routes/gamificationRoutes.js
const express = require("express");
const gamificationController = require("../controllers/gamificationController");
const { requireAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// Get User Gamification Data
router.get("/", requireAuth, gamificationController.getUserGamificationData);

// Update User Progress
router.post(
  "/update-progress",
  requireAuth,
  gamificationController.updateUserProgress
);

// Unlock Achievement
router.post(
  "/unlock-achievement",
  requireAuth,
  gamificationController.unlockAchievement
);

module.exports = router;
