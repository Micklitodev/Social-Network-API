const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    reqired: true,
  },
  email: {
    type: String,
    unique: true,
    require: "true",
  },
  friends: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  thought: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Thought",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
