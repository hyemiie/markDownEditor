const express = require("express");
// const bcrypt = require("'bcryptjs'");

const UserSchema = require("../model/user.model");
const jwt = require("jsonwebtoken");
const secretKey = "thisisthesecretkey";

const Login = async (req, res) => {
  const { userMail, password } = req.body;
const email= userMail;
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) {

      return res.status(401).json({ error: "User not found" });
    }

    if (password == user.password) {
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey);
    // console.log('user', user.)
    const userName = user.username

    // Return token as response
    res.status(200).json({ token, userName });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
<<<<<<< HEAD
=======
    const localStorageItem = req.body;

>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
    const user = req.headers["authorization"]; // Extract user ID from JWT payload

    const token = user.split(" ")[1]; // Extract the token

    const decodedToken = jwt.verify(token, secretKey);

    const userId = decodedToken.userId;

    const signedInUser = await UserSchema.findOne({
<<<<<<< HEAD
      _id: userId,
=======
      email: "yemiojedapo1@gmail.com",
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
    });

    if (!signedInUser) {
      return res.status(404).json({ message: "User not foyund" });
    }

    const username = signedInUser.username;

<<<<<<< HEAD
    res.status(200).json({ signedInUser });
=======
    res.status(200).json({ username });
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const Register = async (req, res) => {
  const data = req.body;

  try {
    const { username, password, email } = req.body;

    const newUser = await UserSchema.create({
      username: username,
      email: email,
      password: password,
      content:[]
    });

    res.status(200).json({ newUser });
  } catch (error) {
    res.status(500).json({
      error: error.message || "An error occurred during registration",
    });
  }
};

module.exports = {
  Login,
  Register,
  getCurrentUser,
};
