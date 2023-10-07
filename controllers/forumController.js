// controllers/forumController.js
const Forum = require("../models/forum");

exports.getAllPosts = async (req, res) => {
  try {
    const forumPosts = await Forum.find().populate("userId", "name");

    res.status(200).json({ success: true, forumPosts });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in getting forum posts",
      error: error.message,
    });
  }
};

// Create a New Forum Post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;

    const newPost = new Forum({ userId, title, content });
    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "Forum post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in creating forum post",
      error: error.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const userId = req.user.userId;

    const updatedPost = await Forum.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { userId, text } },
      },
      { new: true }
    ).populate("userId", "name");

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in adding comment",
      error: error.message,
    });
  }
};

// Update Forum Post
exports.updatePost = async (req, res) => {
  try {
    const { postId, title, content } = req.body;
    const userId = req.user.userId;

    const updatedPost = await Forum.findOneAndUpdate(
      { _id: postId, userId },
      { title, content },
      { new: true }
    ).populate("userId", "name");

    res.status(200).json({
      success: true,
      message: "Forum post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in updating forum post",
      error: error.message,
    });
  }
};

// Delete Forum Post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const deletedPost = await Forum.findOneAndDelete({ _id: postId, userId });

    res.status(200).json({
      success: true,
      message: "Forum post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting forum post",
      error: error.message,
    });
  }
};
