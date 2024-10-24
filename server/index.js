// index.js
const express = require('express');
const cors = require('cors');
const { getText, downloadFile, getAllFiles, createContent, updateFile , viewFile, deleteFile} = require('./controller/content.controller');
const mongoose = require('mongoose')
const {Login, Register, getCurrentUser,} = require('./controller/user.controller')
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/convertText', getText);
app.post('/downloadFile', downloadFile);
app.post('/login', Login);
app.post('/register', Register);
app.post('/currentUser', getCurrentUser);
app.get('/getFiles', getAllFiles);
app.post('/createContent', createContent);
app.post('/updateFile', updateFile);
app.post('/viewFile', viewFile);
app.delete('/deleteFile', deleteFile);

mongoose
  .connect(
    process.env.MONGO_URI,    )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection Failed:", error);
  });

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
