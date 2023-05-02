const { User, Thought } = require("../models");

const userController = {
  // GET ALL USERS
  async getAllUsers(req, res) {
    try {
      const getUser = await User.find({})
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 });
      res.status(200).json(getUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // GET USER WITH ID
  async getUserById({ params }, res) {
    try {
      const specificUser = await User.findOne({ _id: params.id })
        .populate({
          path: "thought",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v");

        console.log(specificUser)

      if (!specificUser) {
        res.status(404).json({ message: "try a different id." });
        return;
      }
      res.status(200).json(specificUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // CREATE NEW USER
  async createUser({ body }, res) {
    try {
      const newUser = await User.create(body);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // UPDATE USER WITH ID
  async updateUser({ params, body }, res) {
    try {
      const updateUser = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });
      if (!updateUser) {
        res.status(404).json({ message: "try a different id." });
        return;
      }
      res.status(200).json(updateUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // DELETE USER
  async deleteUser({ params }, res) {
    try {
      const delUser = await User.findOneAndDelete({ _id: params.id });
      if (!delUser) {
        res.status(404).json({ message: "try a different id." });
        return;
      }

      await User.updateMany(
        { _id: { $in: delUser.friends } },
        { $pull: { friends: params.id } }
      );

      await Thought.deleteMany({ username: delUser.username });
      res.status(200).json({ message: "deleted user." });
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  },

  // ADD FRIEND
  async addFriend({ params }, res) {
    try {
      const addFriend = await User.findOneAndUpdate(
        { _id: params.id },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true }
      );
      if (!addFriend) {
        return res.status(404).json({ message: "try a different id." });
      }
      res.status(200).json(addFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // REMOVE FRIEND
  async deleteFriend({ params }, res) {
    try {
      const delFriend = await User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      if (!delFriend) {
        return res.status(404).json({ message: "try a diffrent id." });
      }
      res.status(200).json(delFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
