const mongoose = require("mongoose");
const Moment = require("moment");

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
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdDate) => Moment(createdDate).format("MMM DD, YYYY"),
    immutable: true,
  },
});

const userThought = new mongoose.Schema(
  {
    thought_content: {
      type: String,
      require: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdDate) => Moment(createdDate).format("MMM DD, YYYY"),
      immutable: true,
    },
    reaction: [userReaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

userThought.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const Thought = mongoose.model("Thought", userThought);

module.exports = Thought;
