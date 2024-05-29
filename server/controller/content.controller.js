const { marked } = require("marked");
const fs = require('fs')
const path = require('path');
const url = require("url");
const { open} = require('fs/promises');

// const hello = require('../../../../Downloads')
const getText = (req, res) => {
    const { he } = req.body;
    console.log("userInput", he);

    // Convert markdown to HTML
    const html = marked(he);
console.log(html)
res.status(200).json({ html });
};


const createFile =async(fileName, data)=> {
    try {
      const file = await open(fileName, 'w');
      await file.write(data);
      console.log(`Opened file ${fileName}`);
    } catch (error) {
      console.error(`Got an error trying to open the file: {error.message}`);
    }
  }



const downloadFile = (req, res) => {
    const { userContent, fileName } = req.body;
    const downloadsPath = path.join(__dirname, '../../../../Downloads', fileName);
    createFile(downloadsPath, userContent)
    fs.open(downloadsPath, function(err){
        console.log(err)
    })


    // fs.appendFile(downloadsPath, userContent, function (err) {
    //     if (err) {
    //         console.error('Error writing to file:', err);
    //         res.status(500).send('Server Error');
    //         return;
    //     }
    //     console.log('Saved!');
    //     res.status(200).send('File saved successfully');
    // });
};

  


module.exports = { getText, downloadFile };

