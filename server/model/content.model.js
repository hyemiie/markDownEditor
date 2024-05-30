/* eslint-disable no-undef */
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ContentSchema = mongoose.Schema({
  fileName:{
    type:String

  },
  userInput: {
    type:String
  },

 

});

const Content = mongoose.model("ContentSchema", ContentSchema);

module.exports = Content;
