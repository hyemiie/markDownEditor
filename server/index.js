// // index.js
// const express = require('express');
// const cors = require('cors');
// const { getText, downloadFile, getAllFiles, createContent, updateFile , viewFile, deleteFile} = require('./controller/content.controller');
// const mongoose = require('mongoose')
// const {Login, Register, getCurrentUser,} = require('./controller/user.controller')
// require('dotenv').config();


// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.post('/convertText', getText);
// app.post('/downloadFile', downloadFile);
// app.post('/login', Login);
// app.post('/register', Register);
// app.post('/currentUser', getCurrentUser);
// app.get('/getFiles', getAllFiles);
// app.post('/createContent', createContent);
// app.put('/updateFile', updateFile);
// app.post('/viewFile', viewFile);
// app.delete('/deleteFile', deleteFile);

// mongoose
//   .connect(
//     process.env.MONGO_URI,    )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch((error) => {
//     console.log("Connection Failed:", error);
//   });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });
// server.js or app.js (UPDATE)
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const setupCollaboration = require('./websocket/collaboration'); // ADD THIS

const contentRoutes = require('./routes/content.router');
const userRoutes = require('./routes/user.router');

const commentRoutes = require('./routes/comment.router');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/content', contentRoutes);
app.use('/api/user', userRoutes);

app.use('/api/comments', commentRoutes);

const wss = setupCollaboration(server);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your-db-name')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});