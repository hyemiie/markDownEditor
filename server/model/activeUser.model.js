const mongoose = require("mongoose");

const ActiveUserSchema = new mongoose.Schema({
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
  socketId: {
    type: String,
    required: true
  },
  cursorPosition: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

ActiveUserSchema.index({ lastActive: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model("ActiveUser", ActiveUserSchema);