const express = require("express");
const authRouter = express.Router();
const auth = require("../../middleware/auth");

const { CreatePost, GetAllPosts } = require("./blogcontroller");

authRouter.post("/:username/newpost", auth, CreatePost);
authRouter.post("/:username/allposts", auth, GetAllPosts);

module.exports = authRouter;
