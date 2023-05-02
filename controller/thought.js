const { User, Thought } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const allThoughts = await Thought.find({})
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");

      res.status(200).json(allThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getThoughtById({ params }, res) {
    try {
      const singleThought = await Thought.findOne({ id: params.id })
        .populate({
          path: "reactions",
          select,
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
  


















};
