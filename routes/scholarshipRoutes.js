const express = require("express");
const scholarshipController = require("../controllers/scholarshipController");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", requireAuth, scholarshipController.createScholarship);

router.get("/all", scholarshipController.getAllScholarships);

router.get(
  "/:scholarshipId",
  requireAuth,
  scholarshipController.getScholarshipById
);

router.put(
  "/:scholarshipId",
  requireAuth,
  scholarshipController.updateScholarshipById
);

router.delete(
  "/:scholarshipId",
  requireAuth,
  scholarshipController.deleteScholarshipById
);

router.get(
  "/recommendations",
  requireAuth,
  scholarshipController.getPersonalizedRecommendations
);

router.get(
  "/map-data",
  requireAuth,
  scholarshipController.getScholarshipsForMap
);

router.get("/search/:keyword", scholarshipController.searchProductController);

module.exports = router;
