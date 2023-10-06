// routes/notificationRoutes.js
const express = require("express");
const notificationController = require("../controllers/notificationController");
const { requireAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// Subscribe to Notifications
router.post(
  "/subscribe",
  requireAuth,
  notificationController.subscribeToNotifications
);

// Unsubscribe from Notifications
router.post(
  "/unsubscribe",
  requireAuth,
  notificationController.unsubscribeFromNotifications
);

// Send Real-time Notification
router.post(
  "/send",
  requireAuth,
  notificationController.sendRealTimeNotification
);

module.exports = router;
