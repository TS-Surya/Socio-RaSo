const express = require("express");
const authRouter = express.Router();
const auth = require("../../middleware/auth");

const { CreatePost, GetAllPosts, deletePost } = require("./blogcontroller");

authRouter.post("/:username/newpost", auth, CreatePost);
authRouter.post("/:username/allposts", auth, GetAllPosts);
authRouter.post("/:username/delete/:id", auth, deletePost);

module.exports = authRouter;
