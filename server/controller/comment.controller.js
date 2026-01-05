// controllers/comment.controller.js
const Comment = require("../model/comment.model");

// Create comment
exports.createComment = async (req, res) => {
    console.log("comment", req.body)
  try {
    const { contentId, userId, commentText, selectionStart, selectionEnd } = req.body;

    const comment = await Comment.create({
      contentId,
      userId,
      commentText,
      selectionStart,
      selectionEnd
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('userId', 'username avatarColor');
    console.log("populated commnt", populatedComment)
    res.status(201).json({ success: true, data: populatedComment });

  } catch (error) {
    console.log("eroor", error)
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get comments for content
exports.getCommentsByContent = async (req, res) => {
  try {
    const { contentId } = req.params;

    const comments = await Comment.find({ contentId })
      .populate('userId', 'username avatarColor')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentText } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      id,
      { commentText },
      { new: true }
    ).populate('userId', 'username avatarColor');

    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await Comment.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Resolve comment
exports.resolveComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByIdAndUpdate(
      id,
      { resolved: true },
      { new: true }
    ).populate('userId', 'username avatarColor');

    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = exports;