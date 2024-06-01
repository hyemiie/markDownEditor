/* eslint-disable no-undef */
const mongoose = require("mongoose");
const User = require('./user.model')

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
    // required: [true, "Please provide the user input"],
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Content = mongoose.model("Content", ContentSchema);

module.exports = Content;
