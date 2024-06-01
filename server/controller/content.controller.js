const { marked } = require("marked");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { open } = require("fs/promises");
const Content = require("../model/content.model");
const User = require("../model/user.model")
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
    const file = await open(fileName, "w");
    await file.write(data);
    console.log(`Opened file ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to open the file: {error.message}`);
  }
};

const downloadFile = async(req, res) => {
  const { userContent, fileName } = req.body;
 

  const downloadsPath = path.join(__dirname, "../../../../Downloads", fileName);
  createFile(downloadsPath, userContent);
  fs.open(downloadsPath, function (err) {
    console.log(err);
  });
};

const createContent = async(req, res)=>{
  let { userContent, fileName, token } = req.body;

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
    const Chats = await User.findById(userId); // Use await and directly pass the id
   

    console.log(Chats.content);
    res.status(200).json(Chats); 
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

const viewFile = async(req, res) =>{
  const { userEdit, selectedID } = req.body;
  const _id =selectedID 
  try {
    const file = await Content.findById(
      { _id: _id }, // Filter by _id
    );
    console.log("newFile", file);
    res.status(200).json({file})
  } catch (error) {
    console.log(error);
  }


}

// render all the files
// get the file id
// click to view and edit file

// update file
module.exports = { getText, downloadFile, getAllFiles ,createContent, updateFile, viewFile};
