<<<<<<< HEAD
// models/content.model.js
const mongoose = require("mongoose");
=======
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const User = require('./user.model')
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079

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
<<<<<<< HEAD
    default: ""
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  lastModified: {
    type: Date,
    default: Date.now
=======
    // required: [true, "Please provide the user input"],
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

<<<<<<< HEAD
module.exports = mongoose.model("Content", ContentSchema);
=======
const Content = mongoose.model("Content", ContentSchema);

module.exports = Content;
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
