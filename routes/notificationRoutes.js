const express = require("express");
const notificationController = require("../controllers/notificationController");
const { requireAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/subscribe",
  requireAuth,
  notificationController.subscribeToNotifications
);

router.post(
  "/unsubscribe",
  requireAuth,
  notificationController.unsubscribeFromNotifications
);

router.post(
  "/send",
  requireAuth,
  notificationController.sendRealTimeNotification
);

module.exports = router;
