// models/content.model.js
const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: [true, "Please provide the file name"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userInput: {
    type: String,
    default: ""
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  lastModified: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Content", ContentSchema);
