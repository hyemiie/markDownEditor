const { marked } = require("marked");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { open } = require("fs/promises");
const Content = require("../model/content.model");

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
  
  const newFile =  await Content.create({
    userInput: 'file to Update',})
  console.log(newFile);

}

const getAllFiles = async (req, res) => {
  try {
    const Chats = await Content.find({}); // Use await and directly pass the id
    console.log(Chats);
    res.status(200).json(Chats); // Send the document as a response
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
