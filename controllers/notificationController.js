// controllers/notificationController.js
const Notification = require("../models/notification");

// Subscribe to Notifications
exports.subscribeToNotifications = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the JWT token in the authentication middleware

    // Check if the user is already subscribed
    const existingSubscription = await Notification.findOne({ userId });

    if (existingSubscription) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User is already subscribed to notifications",
        });
    }

    // Create a new subscription
    const newSubscription = new Notification({ userId });
    await newSubscription.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Subscribed to notifications successfully",
      });
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in subscribing to notifications",
        error: error.message,
      });
  }
};

// Unsubscribe from Notifications
exports.unsubscribeFromNotifications = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the JWT token in the authentication middleware

    // Check if the user is subscribed
    const existingSubscription = await Notification.findOne({ userId });

    if (!existingSubscription) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User is not subscribed to notifications",
        });
    }

    // Remove the subscription
    await existingSubscription.remove();

    res
      .status(200)
      .json({
        success: true,
        message: "Unsubscribed from notifications successfully",
      });
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in unsubscribing from notifications",
        error: error.message,
      });
  }
};

// Send Real-time Notification
exports.sendRealTimeNotification = async (req, res) => {
  try {
    const { message } = req.body;

    // Broadcast the notification to all subscribed users
    // This is a simplified example; in a real application, you would use a WebSocket library for real-time communication
    const subscribedUsers = await Notification.find();
    subscribedUsers.forEach(async (user) => {
      // Save the notification to the user's notification list
      const newNotification = new Notification({
        userId: user._id,
        message,
      });
      await newNotification.save();
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Real-time notification sent successfully",
      });
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in sending real-time notification",
        error: error.message,
      });
  }
};
