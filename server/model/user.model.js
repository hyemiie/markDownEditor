/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Content = require("./content.model");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please input your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your password"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
Content:[]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
