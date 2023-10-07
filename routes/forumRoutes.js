const express = require("express");
const forumController = require("../controllers/forumController");
const { requireAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", forumController.getAllPosts);

router.post("/create", requireAuth, forumController.createPost);

router.post("/add-comment", requireAuth, forumController.addComment);

router.put("/update/:postId", requireAuth, forumController.updatePost);

router.delete("/delete/:postId", requireAuth, forumController.deletePost);

module.exports = router;
