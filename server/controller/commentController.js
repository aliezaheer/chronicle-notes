const Comment = require("../model/commentModal");

exports.newComment = async (req, res) => {
  try {
    const comment = await new Comment(req.body);
    comment.save();

    res.status(200).json({ msg: "Comment saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
