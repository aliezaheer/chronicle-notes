const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../model/userModal");
const Tokken = require("../model/tokenModel");

dotenv.config();

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
    res.status(500).json({ msg: "Error while signup" + error });
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
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Tokken({ token: refreshToken });
      await newToken.save();

      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.fullname,
        username: user.username,
      });
    } else {
      res.status(400).json({ msg: "User password doesnot match" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error while login user" + error });
  }
};

// jwt key genration command, should be run in node:
// require("crypto").randomBytes(64).toString("hex")
