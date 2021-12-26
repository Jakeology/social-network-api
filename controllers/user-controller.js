const { User } = require("../models");
const { db } = require("../models/User");

const userController = {
  // returns all users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // returns one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //creates a new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //updates an existing user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //deletes an existing user by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    User.findOne({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Invalid user with this id" });
          return;
        }

        User.findOne({ _id: params.friendId })
          .then((dbFriendData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "Invalid friend with this id" });
              return;
            }

            if (!dbUserData.friends.includes(dbFriendData._id)) {
              User.updateOne({ _id: params.friendId }, { $push: { friends: params.userId } }, { new: true }).catch((err) =>
                res.status(400).json(err)
              );
              User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true })
                .then((updatedData) => {
                  res.json(updatedData);
                })
                .catch((err) => res.status(400).json(err));
            } else {
              return res.status(404).json({ message: "This user is already your friend" });
            }
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  removeFriend({ params }, res) {
    User.findOne({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Invalid user with this id" });
          return;
        }

        User.findOne({ _id: params.friendId })
          .then((dbFriendData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "Invalid friend with this id" });
              return;
            }

            if (dbUserData.friends.includes(dbFriendData._id)) {
              User.updateOne({ _id: params.friendId }, { $pull: { friends: params.userId } }, { new: true }).catch((err) =>
                res.status(400).json(err)
              );
              User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true })
                .then((updatedData) => {
                  res.json(updatedData);
                })
                .catch((err) => res.status(400).json(err));
            } else {
              return res.status(404).json({ message: "You can't remove a friend that isn't on your friends list" });
            }
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
