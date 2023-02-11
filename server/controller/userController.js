const User = require("../model/userModal");
const bcrypt = require("bcrypt");

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
