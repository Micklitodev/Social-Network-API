const { User, Thought } = require("../models");

const thoughtController = {
  // GET ALL THOUGHTS
  async getAllThoughts(req, res) {
    try {
      const allThoughts = await Thought.find({})
        .populate({
          path: "reaction",
          select: "-__v",
        })
        .select("-__v");

      res.status(200).json(allThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // GET SPECIFIC THOUGHT
  async getThoughtById({ params }, res) {
    try {
      const singleThought = await Thought.findOne({ _id: params.thought_id })
        .populate({
          path: "reaction",
          select: "-__v",
        })
        .select("-__v");
      if (!singleThought) {
        return res.status(404).json({ message: "try another id" });
      }

      res.status(200).json(singleThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // CREATE THOUGHT
  async newThought({ body }, res) {
    try {
      const createThought = await Thought.create(body);
      const userThought = await User.findOneAndUpdate(
        { _id: body.user_id },
        { $push: { thought: createThought.id } },
        { new: true }
      );
      if (!userThought) {
        res.status(404).json({ message: "please try a diffrent id." });
        return;
      }
      res.status(200).json(userThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // UPDATE THOUGHT BY ID
  async updateThought({ params, body }, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: params.thought_id },
        body,
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: "please try a diffrent id." });
        return;
      }
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE THOUGHT
  async deleteThought({ params }, res) {
    try {
      const delThought = await Thought.findOneAndDelete({
        _id: params.thought_id,
      });
      if (!delThought) {
        return res.status(404).json({ message: "please try a diffrent id." });
      }
      const delUserThought = await User.findOneAndUpdate(
        { thought: params.id },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
      res.status(200).json({ message: "Thought deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // ADD NEW REACTION TO THOUGHT
  async createReaction({ params, body }, res) {
    try {
      const getThought = await Thought.findOneAndUpdate(
        { _id: params.thought_id },
        { $addToSet: { reaction: body } },
        { new: true, runValidators: true }
      );
      if (!getThought) {
        return res.status(404).json({ message: "please try a diff id." });
      }
      res.status(200).json(getThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // DELETE REACTION
  async delReaction({ params }, res) {
    try {
      const delReact = await Thought.findOneAndUpdate(
        { _id: params.thought_id },
        { $pull: { reaction: { _id: params.react_id } } },
        { new: true }
      );
      if (!delReact) {
        return res.status(404).json({ message: "try a diffferent id." });
      }
      res.status(200).json({ message: "reaction deleted." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
