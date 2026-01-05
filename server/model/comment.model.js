const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commentText: {
    type: String,
    required: true
  },
  selectionStart: {
    type: Number,
    required: true
  },
  selectionEnd: {
    type: Number,
    required: true
  },
  resolved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", CommentSchema);