/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Content = require("./content.model");  // Use the schema, not the model

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
  content: [Content]  // Embedding the Content schema
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
