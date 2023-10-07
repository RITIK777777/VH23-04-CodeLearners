// routes/gamificationRoutes.js
const express = require("express");
const gamificationController = require("../controllers/gamificationController");
const { requireAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", requireAuth, gamificationController.getUserGamificationData);

router.post(
  "/update-progress",
  requireAuth,
  gamificationController.updateUserProgress
);

router.post(
  "/unlock-achievement",
  requireAuth,
  gamificationController.unlockAchievement
);

module.exports = router;
