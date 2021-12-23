const router = require("express").Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, removeThought } = require("../../controllers/thought-controller");

// /api/comments/<pizzaId>
router.route("/").get(getAllThoughts).post(addThought);

// /api/comments/<pizzaId>/<commentId>
router.route("/:id").get(getThoughtById).put(updateThought).delete(removeThought);

module.exports = router;