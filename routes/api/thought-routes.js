const router = require("express").Router();
const { getAllThoughts, addThought, removeThought } = require("../../controllers/thought-controller");

// /api/comments/<pizzaId>
router.route("/").get(getAllThoughts).post(addThought);

// /api/comments/<pizzaId>/<commentId>
router.route("/:pizzaId/:commentId").delete(removeThought);

module.exports = router;