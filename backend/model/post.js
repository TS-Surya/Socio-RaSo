const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  author: { type: String },
  title: { type: String },
  content: { type: String },
  userID: { type: String },
});

module.exports = mongoose.model("Post", Post);
