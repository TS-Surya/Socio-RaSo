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

const deletePost = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  if (!id)
    return res.json({
      message: "Something Went Wrong",
      ok: false,
    });

  const blog = await Post.findOneAndDelete({ _id: id });

  return res.json({
    ok: true,
    message: "Successfull Deleted",
  });
};

const CRUD = {
  CreatePost,
  GetAllPosts,
  deletePost,
};

module.exports = CRUD;
