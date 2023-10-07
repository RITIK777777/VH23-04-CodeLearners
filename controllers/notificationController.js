const Notification = require("../models/notification");

exports.subscribeToNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const existingSubscription = await Notification.findOne({ userId });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: "User is already subscribed to notifications",
      });
    }

    const newSubscription = new Notification({ userId });
    await newSubscription.save();

    res.status(200).json({
      success: true,
      message: "Subscribed to notifications successfully",
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in subscribing to notifications",
      error: error.message,
    });
  }
};

exports.unsubscribeFromNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const existingSubscription = await Notification.findOne({ userId });

    if (!existingSubscription) {
      return res.status(400).json({
        success: false,
        message: "User is not subscribed to notifications",
      });
    }

    await existingSubscription.remove();

    res.status(200).json({
      success: true,
      message: "Unsubscribed from notifications successfully",
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in unsubscribing from notifications",
      error: error.message,
    });
  }
};

// Sending Real-time Notification
exports.sendRealTimeNotification = async (req, res) => {
  try {
    const { message } = req.body;

    const subscribedUsers = await Notification.find();
    subscribedUsers.forEach(async (user) => {
      const newNotification = new Notification({
        userId: user._id,
        message,
      });
      await newNotification.save();
    });

    res.status(200).json({
      success: true,
      message: "Real-time notification sent successfully",
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in sending real-time notification",
      error: error.message,
    });
  }
};
