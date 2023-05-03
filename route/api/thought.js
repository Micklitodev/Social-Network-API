const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  newThought,
  updateThought,
  deleteThought,
  createReaction,
  delReaction,
} = require("../../controller/thought");

router.route("/thought").get(getAllThoughts).post(newThought);

router
  .route("/thought/:thought_id")
  .get(getThoughtById)
  .delete(deleteThought)
  .put(updateThought);

router.route("/thought/:thought_id/reaction").post(createReaction);

router.route("/thought/:thought_id/reaction/:react_id").delete(delReaction);

module.exports = router;
