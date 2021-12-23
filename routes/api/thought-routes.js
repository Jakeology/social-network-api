const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// /api/comments/<pizzaId>
router.route("/").get(getAllThoughts).post(addThought);

// /api/comments/<pizzaId>/<commentId>
router.route("/:id").get(getThoughtById).put(updateThought).delete(removeThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
