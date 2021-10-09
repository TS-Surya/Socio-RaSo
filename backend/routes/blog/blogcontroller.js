const Post = require("../../model/post");

const CreatePost = async (req, res) => {
  const { author, title, content, authorID } = req.body;

  if (!author || !authorID)
    return res.json({ message: "Something Wrong! Relogin" });

  const post = new Post({
    author: author,
    title: title,
    content: content,
    userID: authorID,
  });

  try {
    await post.save();

    res.json({
      message: "Blog Posted Successfully",
      ok: true,
      post: post,
    });
  } catch (e) {
    res.json({
      message: e.message,
      ok: false,
    });
  }
};

// getall blogs

const GetAllPosts = async (req, res) => {
  const { userID } = req.body;

  if (!userID)
    return res.json({
      message: "Invalid Access.Kindly Relogin",
      ok: false,
    });

  const posts = await Post.find({ userID: userID });

  if (!posts)
    return res.json({
      message: "You are Not Posted Yet!",
      ok: false,
    });

  return res.json({
    posts: posts,
    message: "Success",
    ok: true,
  });
};

const CRUD = {
  CreatePost,
  GetAllPosts,
};

module.exports = CRUD;
