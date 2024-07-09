const { marked } = require("marked");
const fs = require("fs");
const path = require("path");
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
  const html = marked(he);
  console.log(html);
  res.status(200).json({ html });
};


const createFile = async (fileName, data) => {
  try {
    await fs.writeFile(fileName, data);
    console.log(`Created file ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to create the file: ${error.message}`);
    throw error;
  }
};


const downloadFile = async (req, res) => {
  console.log('Download function called');
  console.log('Request body:', req.body);

  try {
    const { userContent, fileName } = req.body;

    if (!userContent || !fileName) {
      throw new Error('Missing userContent or fileName in request body');
    }

    console.log('userContent:', userContent);
    console.log('fileName:', fileName);

    // Create a temporary file
    const tempDir = path.join(__dirname, 'temp');
    await fs.mkdir(tempDir, { recursive: true });
    const filePath = path.join(tempDir, fileName);

    // Write content to the file
    await fs.writeFile(filePath, userContent);

    // Send the file as a download
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(`Error sending file: ${err.message}`);
        if (!res.headersSent) {
          res.status(500).send('Error downloading file');
        }
      }
      // Delete the temporary file after sending
      fs.unlink(filePath).catch(unlinkErr => {
        console.error(`Error deleting temporary file: ${unlinkErr.message}`);
      });
    });
   
  } catch (error) {
    console.error(`Error in downloadFile: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};



const createContent = async(req, res)=>{
  let { userContent, fileName, token } = req.body;
  console.log(req.body)

  const decodedToken = jwt.verify(token, secretKey);
  const userId = decodedToken.userId

  if (userContent.length > 0){
    userContent = "Update your file "
  }

   const newFile =  await Content.create({
    fileName:fileName,
    userId,
    userInput: userContent,
    
  })
  console.log(newFile);
  const Chats = await User.findById(userId); 
  console.log(Chats.content);
  res.status(200).json(Chats); 


  const user = await User.findById(userId)

  if(!user){
    console.log('No user found')
  }
  {
   user.content.push(newFile)
   await user.save();
    console.log('done', user)
    return 'Done'
  }

 


 

}

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

const getAllFiles = async (req, res) => {
  const user = req.headers["authorization"]; 
  console.log("User", user);

  const token = user.split(" ")[1];
const userToken = jwt.verify(token, secretKey)
console.log(userToken.userId)
const userId = userToken.userId

  try {
    // const Chats = await User.findById(userId); // Use await and directly pass the id
    const updatedChat = await Content.find({ }).sort({ createdAt: 1 });


    console.log("updatedChat", updatedChat);
    res.status(200).json(updatedChat); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); // Send an error response
  }
};

const updateFile = async (req, res) =>{
  const { userEdit, selectedID } = req.body;
const _id =selectedID 
  try {
    const updatedFile = await Content.findOneAndUpdate(
      { _id: _id }, // Filter by _id
      { userInput: userEdit }, // Update operation
      { new: true } // Return the updated document
    );
    console.log("newFile", updatedFile);
  } catch (error) {
    console.log(error);
  }
}

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
  const userID = req.query.userID;
  console.log("teamId", userID)
  console.log("Attempting to delete message with ID:", messageId);

  try {
    const result = await Content.deleteOne({ _id: messageId });

    // if (result.deletedCount !== 1) {
      console.log("Message deleted successfully");
      
    
      const updatedChat = await Content.find({ }).sort({ createdAt: 1 });
      // const updatedChat = await Content.find({});
      console.log('updatedChat', updatedChat)
      
      res.status(200).json({ 
        message: "Chat deleted successfully",
        updatedChat: updatedChat
      });
      console.log("Done");

    // // } else {
    //   console.log("Message not found");
    //   res.status(404).json({ error: "Message not found" });
    
  } catch (error) {
    console.log('Error deleting message:', error);
    res.status(500).json({ error: "Error deleting chat", details: error.message });
  }
};




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
