const express = require("express");
const authRouter = express.Router();
const auth = require("../../middleware/auth");

const {
  createPost,
  getAllSingleUserPosts,
  deletePost,
} = require("./blogcontroller");

authRouter.post("/:username/newpost", auth, createPost);
authRouter.post("/:username/allposts", auth, getAllSingleUserPosts);
authRouter.post("/:username/delete/:id", auth, deletePost);

module.exports = authRouter;
