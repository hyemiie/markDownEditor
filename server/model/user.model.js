<<<<<<< HEAD
// models/user.model.js
const mongoose = require("mongoose");
=======
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Content = require("./content.model");  // Use the schema, not the model
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please input your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
<<<<<<< HEAD
  avatarColor: {
    type: String,
    default: function() {
      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }
});

module.exports = mongoose.model("User", UserSchema);
=======
  content: [Content]  // Embedding the Content schema
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
