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
  let category = req.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    if (!post) {
      response.status(404).json({ msg: "Post not found" });
    }

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("post updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    await post.delete();

    return res.status(200).json({ msg: "post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
