//middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SESSION_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch user from the database using the decoded token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = { userId: user._id, email: user.email }; // Set user information on the req object
    next();
  });
};

module.exports = { requireAuth };
