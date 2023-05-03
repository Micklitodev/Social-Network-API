const mongoose = require("mongoose");

const userReaction = new mongoose.Schema({
  reaction_id: {
    type: mongoose.SchemaTypes.ObjectId,
    default: () => {
      new mongoose.Types.ObjectId();
    },
  },
  reaction_content: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const userThought = new mongoose.Schema({
  thought_content: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    defualt: () => Date.now(),
    immutable: true,
  },
  reaction: [userReaction],
});

const Thought = mongoose.model("Thought", userThought);

module.exports = Thought;
