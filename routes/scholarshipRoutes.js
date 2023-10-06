// routes/scholarshipRoutes.js
const express = require("express");
const scholarshipController = require("../controllers/scholarshipController");
const { requireAuth } = require("../middlewares/authMiddleware"); // Import requireAuth directly

const router = express.Router();

// Create Scholarship
router.post("/create", requireAuth, scholarshipController.createScholarship);

// Get All Scholarships
router.get("/all", requireAuth, scholarshipController.getAllScholarships);

// Get Scholarship by ID
router.get(
  "/:scholarshipId",
  requireAuth,
  scholarshipController.getScholarshipById
);

// Update Scholarship by ID
router.put(
  "/:scholarshipId",
  requireAuth,
  scholarshipController.updateScholarshipById
);

// Delete Scholarship by ID
router.delete(
  "/:scholarshipId",
  requireAuth,
  scholarshipController.deleteScholarshipById
);

// Get Personalized Scholarship Recommendations
router.get(
  "/recommendations",
  requireAuth,
  scholarshipController.getPersonalizedRecommendations
);

// Get Scholarship Data for Map
router.get(
  "/map-data",
  requireAuth,
  scholarshipController.getScholarshipsForMap
);

module.exports = router;
