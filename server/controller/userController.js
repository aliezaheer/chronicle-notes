const User = require("../model/userModal");
const bcrypt = require("bcrypt");
const { request } = require("express");

exports.signupUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = {
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashedPassword,
    };
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ msg: "Signup Successful!" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

exports.loginUser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "Username does not exist" });
  }

  try {
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (matchPassword) {
    } else {
      res.status(400).json({ msg: "User password doesnot match." });
    }
  } catch (error) {}
};
