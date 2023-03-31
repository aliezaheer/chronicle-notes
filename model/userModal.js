const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
  fullname: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
