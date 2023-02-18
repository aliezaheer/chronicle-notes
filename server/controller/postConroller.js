const Post = require("../model/postModel");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();

    res.status(200).json("Post saved successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    let posts = await Post.find({});

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
