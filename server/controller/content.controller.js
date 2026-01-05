const { marked } = require("marked");
const fs = require("fs");
const path = require("path");
<<<<<<< HEAD
const Content = require("../model/content.model");
const User = require("../model/user.model");
const Comment = require("../model/comment.model"); 
const ActiveUser = require("../model/activeUser.model"); 
const jwt = require('jsonwebtoken');

const secretKey = "thisisthesecretkey";

const getText = (req, res) => {
  const { he } = req.body;
  console.log("userInput", he);
=======
const url = require("url");
const { open } = require("fs/promises");
const Content = require("../model/content.model");
const User = require("../model/user.model")
const download = require('download');
const jwt = require('jsonwebtoken')

const secretKey = "thisisthesecretkey";


// const hello = require('../../../../Downloads')
const getText = (req, res) => {
  const { he } = req.body;
  console.log("userInput", he);

  // Convert markdown to HTML
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
  const html = marked(he);
  console.log(html);
  res.status(200).json({ html });
};

<<<<<<< HEAD
=======

const createFile = async (fileName, data) => {
  try {
    await fs.writeFile(fileName, data);
    console.log(`Created file ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to create the file: ${error.message}`);
    throw error;
  }
};


>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
const downloadFile = async (req, res) => {
  console.log('Download function called');
  console.log('Request body:', req.body);

  try {
    const { userContent, fileName } = req.body;

    if (!userContent || !fileName) {
      throw new Error('Missing userContent or fileName in request body');
    }

<<<<<<< HEAD
=======
    console.log('userContent:', userContent);
    console.log('fileName:', fileName);

    // Create a temporary file
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
    const tempDir = path.join(__dirname, 'temp');
    await fs.mkdir(tempDir, { recursive: true });
    const filePath = path.join(tempDir, fileName);

<<<<<<< HEAD
    await fs.writeFile(filePath, userContent);

=======
    // Write content to the file
    await fs.writeFile(filePath, userContent);

    // Send the file as a download
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(`Error sending file: ${err.message}`);
        if (!res.headersSent) {
          res.status(500).send('Error downloading file');
        }
      }
<<<<<<< HEAD
=======
      // Delete the temporary file after sending
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
      fs.unlink(filePath).catch(unlinkErr => {
        console.error(`Error deleting temporary file: ${unlinkErr.message}`);
      });
    });
   
  } catch (error) {
    console.error(`Error in downloadFile: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

<<<<<<< HEAD
// Your existing createContent function
=======


>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
const createContent = async (req, res) => {
  try {
    let { userContent, fileName, token } = req.body;
    console.log("req.body", req.body);

    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

<<<<<<< HEAD
    console.log("decoded token", decodedToken)
=======
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
    const newFile = await Content.create({
      fileName,
      userId,
      userInput: userContent,
<<<<<<< HEAD
      collaborators: [] 
=======
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
    });
    console.log("newFile", newFile);

    const user = await User.findById(userId);

    if (!user) {
      console.log('No user found');
      return res.status(404).json({ error: 'User not found' });
    }

<<<<<<< HEAD
    if(user.content){
    user.content.push(newFile._id);
    await user.save();

    }

    res.status(200).json(newFile);
=======
    user.content.push(newFile._id);
    await user.save();

    const chats = await Content.find({ userId }).sort({ createdAt: 1 });
    res.status(200).json(chats);

>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
    console.log("New file added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

<<<<<<< HEAD
// Your existing getAllFiles function
=======
// const getAllFiles = async (req, res) => {
//   try {
//     const Chats = await Content.find({}); // Use await and directly pass the id
//     console.log(Chats);
//     res.status(200).json(Chats); // Send the document as a response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' }); // Send an error response
//   }
// };

>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
const getAllFiles = async (req, res) => {
  const user = req.headers["authorization"]; 
  console.log("User", user);

  const token = user.split(" ")[1];
<<<<<<< HEAD
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
=======
const userToken = jwt.verify(token, secretKey)
console.log(userToken.userId)
const userId = userToken.userId


  try {
    // const Chats = await User.findById(userId); // Use await and directly pass the id
    const updatedChat = await Content.find({userId }).sort({ createdAt: 1 });


    res.status(200).json(updatedChat); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); // Send an error response
  }
};

const updateFile = async (req, res) => {
  const { userEdit, selectedID } = req.body;
  const _id = selectedID;
  
  try {
    const updatedFile = await Content.findOneAndUpdate(
      { _id: _id },               // Filter by _id
      { userInput: userEdit },     // Update operation
      { new: true }                // Return the updated document
    );

    if (updatedFile) {
      console.log("Updated File:", updatedFile);
      res.status(200).json({ message: "File updated successfully", updatedFile });
    } else {
      console.log("No file found with that ID");
      res.status(404).json({ message: "File not found" });
    }

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "An error occurred while updating the file", error });
  }
};

// const deleteFile = async (req, res) => {
//   const { selectedID } = req.body;
//   console.log('selectedId', selectedID);


//   try {
//     const result = await Content.deleteOne({ _id: selectedID });
    
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: 'File not found' });
//     }
    
//     console.log('File deleted successfully');
//     res.status(200).json({ message: 'File deleted successfully' });
    
//     // Log remaining contents
//     const remainingContents = await Content.find({});
//     console.log("Remaining contents:", remainingContents);
    
//   } catch (error) {
//     console.error('Error deleting file:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const deleteFile = async (req, res) => {
  const messageId = req.query.messageID;
  const userId = req.query.currentUserID;
  console.log("teamId", userId)
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
  console.log("Attempting to delete message with ID:", messageId);

  try {
    const result = await Content.deleteOne({ _id: messageId });
<<<<<<< HEAD
    console.log("Message deleted successfully");
    
    // Also delete associated comments when deleting content
    await Comment.deleteMany({ contentId: messageId });
    
    const updatedChat = await Content.find({ userId }).sort({ createdAt: 1 });
    
    res.status(200).json({ 
      message: "Chat deleted successfully",
      updatedChat: updatedChat
    });
    console.log("Done");
=======

    // if (result.deletedCount !== 1) {
      console.log("Message deleted successfully");
      
    
      // const updatedChat = await Content.find({userId:userID }).sort({ createdAt: 1 });
        const updatedChat = await Content.find({userId }).sort({ createdAt: 1 });

      // const updatedChat = await Content.find({});
      
      res.status(200).json({ 
        message: "Chat deleted successfully",
        updatedChat: updatedChat
      });
      console.log("Done");

    // // } else {
    //   console.log("Message not found");
    //   res.status(404).json({ error: "Message not found" });
    
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
  } catch (error) {
    console.log('Error deleting message:', error);
    res.status(500).json({ error: "Error deleting chat", details: error.message });
  }
};

<<<<<<< HEAD
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
=======



const viewFile = async(req, res) =>{
  const { userEdit, selectedID } = req.body;
  const _id =selectedID 
  try {
    const file = await Content.findById(
      { _id: _id }, // Filter by _id
    );
    res.status(200).json({file})
  } catch (error) {
    console.log(error);
  }

}



// render all the files
// get the file id
// click to view and edit file

// update file
module.exports = { getText, downloadFile, getAllFiles ,createContent, updateFile, viewFile, deleteFile};
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
