const { marked } = require("marked");
const fs = require("fs");
const path = require("path");
const Content = require("../model/content.model");
const User = require("../model/user.model");
const Comment = require("../model/comment.model"); 
const ActiveUser = require("../model/activeUser.model"); 
const jwt = require('jsonwebtoken');

const secretKey = "thisisthesecretkey";

const getText = (req, res) => {
  const { he } = req.body;
  console.log("userInput", he);
  const html = marked(he);
  console.log(html);
  res.status(200).json({ html });
};

const downloadFile = async (req, res) => {
  console.log('Download function called');
  console.log('Request body:', req.body);

  try {
    const { userContent, fileName } = req.body;

    if (!userContent || !fileName) {
      throw new Error('Missing userContent or fileName in request body');
    }

    const tempDir = path.join(__dirname, 'temp');
    await fs.mkdir(tempDir, { recursive: true });
    const filePath = path.join(tempDir, fileName);

    await fs.writeFile(filePath, userContent);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(`Error sending file: ${err.message}`);
        if (!res.headersSent) {
          res.status(500).send('Error downloading file');
        }
      }
      fs.unlink(filePath).catch(unlinkErr => {
        console.error(`Error deleting temporary file: ${unlinkErr.message}`);
      });
    });
   
  } catch (error) {
    console.error(`Error in downloadFile: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// Your existing createContent function
const createContent = async (req, res) => {
  try {
    let { userContent, fileName, token } = req.body;
    console.log("req.body", req.body);

    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    console.log("decoded token", decodedToken)
    const newFile = await Content.create({
      fileName,
      userId,
      userInput: userContent,
      collaborators: [] 
    });
    console.log("newFile", newFile);

    const user = await User.findById(userId);

    if (!user) {
      console.log('No user found');
      return res.status(404).json({ error: 'User not found' });
    }

    if(user.content){
    user.content.push(newFile._id);
    await user.save();

    }

    res.status(200).json(newFile);
    console.log("New file added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Your existing getAllFiles function
const getAllFiles = async (req, res) => {
  const user = req.headers["authorization"]; 
  console.log("User", user);

  const token = user.split(" ")[1];
  const userToken = jwt.verify(token, secretKey);
  console.log(userToken.userId);
  const userId = userToken.userId;

  try {
    const updatedChat = await Content.find({ userId }).sort({ createdAt: 1 });
    res.status(200).json(updatedChat); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// UPDATED updateFile - with real-time broadcast support
const updateFile = async (req, res) => {
  const { _id, fileName, userInput } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "Missing file ID" });
  }

  try {
    const updateData = {
      lastModified: Date.now() // Track when it was modified
    };

    if (fileName !== undefined) updateData.fileName = fileName;
    if (userInput !== undefined) updateData.userInput = userInput;

    const updatedFile = await Content.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    // Broadcast to WebSocket clients is handled in WebSocket server
    return res.status(200).json({
      message: "File updated",
      updatedFile,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Error updating file", error });
  }
};

// Your existing deleteFile function
const deleteFile = async (req, res) => {
  const messageId = req.query.messageID;
  const userId = req.query.currentUserID;
  console.log("teamId", userId);
  console.log("Attempting to delete message with ID:", messageId);

  try {
    const result = await Content.deleteOne({ _id: messageId });
    console.log("Message deleted successfully");
    
    // Also delete associated comments when deleting content
    await Comment.deleteMany({ contentId: messageId });
    
    const updatedChat = await Content.find({ userId }).sort({ createdAt: 1 });
    
    res.status(200).json({ 
      message: "Chat deleted successfully",
      updatedChat: updatedChat
    });
    console.log("Done");
  } catch (error) {
    console.log('Error deleting message:', error);
    res.status(500).json({ error: "Error deleting chat", details: error.message });
  }
};

// Your existing viewFile function
// const viewFile = async (req, res) => {
//   const { userEdit, selectedID } = req.body;
//   const _id = selectedID;
  
//   try {
//     const file = await Content.findById(_id)
//       .populate('userId', 'username email avatarColor') // ADD THIS to get user info
//       .populate('collaborators', 'username avatarColor'); // ADD THIS to get collaborators
    
//     res.status(200).json({ file });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error fetching file' });
//   }
// };


// controllers/content.controller.js - Update viewFile function
const viewFile = async (req, res) => {
  const { userEdit, selectedID } = req.body;
  const _id = selectedID;
  
  try {
    const file = await Content.findById(_id)
      .populate('userId', 'username email avatarColor')
      .populate('collaborators', 'username avatarColor');
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.status(200).json({ file });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching file' });
  }
};

const addCollaborator = async (req, res) => {
  try {
    const { contentId, userEmail } = req.body;
    
    // Find user by email
    const collaborator = await User.findOne({ email: userEmail });
    
    if (!collaborator) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Add to collaborators array
    const content = await Content.findByIdAndUpdate(
      contentId,
      { $addToSet: { collaborators: collaborator._id } }, // $addToSet prevents duplicates
      { new: true }
    ).populate('collaborators', 'username email avatarColor');
    
    res.status(200).json({ 
      message: 'Collaborator added',
      content 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding collaborator' });
  }
};

// NEW: Get active users for a document
const getActiveUsers = async (req, res) => {
  try {
    const { contentId } = req.params;
    
    const activeUsers = await ActiveUser.find({ contentId })
      .populate('userId', 'username avatarColor')
      .sort({ lastActive: -1 });
    
    res.status(200).json({ 
      success: true, 
      data: activeUsers 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const getContentById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findById(id)
      .populate('userId', 'username email avatarColor')
      .populate('collaborators', 'username avatarColor');

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Error fetching content' });
  }
};

module.exports = { 
  getText, 
  downloadFile, 
  getAllFiles, 
  createContent, 
  updateFile, 
  viewFile, 
  deleteFile,
  addCollaborator,  
  getActiveUsers,
  getContentById
};