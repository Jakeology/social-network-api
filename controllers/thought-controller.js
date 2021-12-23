const { Thought, User } = require("../models");

const thoughtController = {
  // add comment to pizza

  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true });
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //   addReaction({ params, body }, res) {
  //     Comment.findOneAndUpdate({ _id: params.commentId }, { $push: { replies: body } }, { new: true, runValidators: true })
  //       .then((dbPizzaData) => {
  //         if (!dbPizzaData) {
  //           res.status(404).json({ message: "No pizza found with this id!" });
  //           return;
  //         }
  //         res.json(dbPizzaData);
  //       })
  //       .catch((err) => res.json(err));
  //   },

  //   // remove reply
  //   removeReply({ params }, res) {
  //     Comment.findOneAndUpdate({ _id: params.commentId }, { $pull: { replies: { replyId: params.replyId } } }, { new: true })
  //       .then((dbPizzaData) => res.json(dbPizzaData))
  //       .catch((err) => res.json(err));
  //   },

  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate({ _id: params.userId }, { $pull: { thoughts: params.thoughtId } }, { new: true });
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
