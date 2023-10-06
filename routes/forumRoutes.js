// routes/forumRoutes.js
const express = require("express");
const forumController = require("../controllers/forumController");
const { requireAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// Get All Forum Posts
router.get("/", forumController.getAllPosts);

// Create a New Forum Post
router.post("/create", requireAuth, forumController.createPost);

// Add Comment to Forum Post
router.post("/add-comment", requireAuth, forumController.addComment);

// Update Forum Post
router.put("/update/:postId", requireAuth, forumController.updatePost);

// Delete Forum Post
router.delete("/delete/:postId", requireAuth, forumController.deletePost);

module.exports = router;
