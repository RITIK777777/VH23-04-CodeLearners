// routes/protectedRoute.js

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route example
router.get("/protected", authMiddleware, (req, res) => {
  res.send("This is a protected route");
});

module.exports = router;
