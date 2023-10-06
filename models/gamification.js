// models/gamification.js
const mongoose = require("mongoose");

const gamificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  achievements: {
    type: [String],
    default: [],
  },
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  coins: {
    type: Number,
    default: 0,
  },
  // Add any other fields you need for gamification
});

module.exports = mongoose.model("Gamification", gamificationSchema);
