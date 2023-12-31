const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eligibilityCriteria: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
});

scholarshipSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Scholarship", scholarshipSchema);
