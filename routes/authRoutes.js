const express = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware"); // Import the authentication middleware

const router = express.Router();

// Registration
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

router.get("/protected", requireAuth, (req, res) => {
  res.json({
    success: true,
    message: "You have access to this protected route",
    user: req.user,
  });
});

router.get("/user-profile/:id", requireAuth, authController.getUserProfile);

router.put(
  "/update-profile/:id",
  requireAuth,
  authController.updateUserProfile
);

module.exports = router;
