// controllers/gamificationController.js
const Gamification = require("../models/gamification");

// Get User Gamification Data
exports.getUserGamificationData = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the JWT token in the authentication middleware

    const gamificationData = await Gamification.findOne({ userId });

    if (!gamificationData) {
      // Create a new gamification record if not exists
      const newGamificationData = new Gamification({ userId });
      await newGamificationData.save();

      res
        .status(200)
        .json({ success: true, gamificationData: newGamificationData });
    } else {
      res.status(200).json({ success: true, gamificationData });
    }
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in getting user gamification data",
        error: error.message,
      });
  }
};

// Update User Progress
exports.updateUserProgress = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the JWT token in the authentication middleware

    const gamificationData = await Gamification.findOneAndUpdate(
      { userId },
      { $inc: { progress: 1, experience: 10, coins: 5 } }, // Adjust values as needed
      { new: true }
    );

    res.status(200).json({ success: true, gamificationData });
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in updating user progress",
        error: error.message,
      });
  }
};

// Unlock Achievement
exports.unlockAchievement = async (req, res) => {
  try {
    const { achievement } = req.body;
    const userId = req.user.userId; // Extracted from the JWT token in the authentication middleware

    const gamificationData = await Gamification.findOneAndUpdate(
      { userId },
      { $addToSet: { achievements: achievement, experience: 20, coins: 10 } } // Adjust values as needed
    );

    res.status(200).json({ success: true, gamificationData });
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in unlocking achievement",
        error: error.message,
      });
  }
};
