const User = require("../model/userModal");

exports.signupUser = async (req, res) => {
  try {
    const user = req.body;

    const newUser = new User(user);
    await newUser.save();

    return res.status(200).json({ msg: "Signup Successful!" });
  } catch (error) {
    res.status(500).json({ msg: "Error while signp the user" });
  }
};
