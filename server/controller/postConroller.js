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
