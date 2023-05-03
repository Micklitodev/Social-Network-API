const mongoose = require("mongoose");

const validateEmail = (email) => {
  const et = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return et.test(email);
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      reqired: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    friends: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    thought: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);


userSchema.virtual('friendCount').get(function () {
  return this.friends.length
});

const User = mongoose.model("User", userSchema);

module.exports = User;
