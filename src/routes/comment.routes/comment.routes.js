const router = require("express").Router();

const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
const comment = require("../../controller/comment.controller/comment.controller");

router
  .route("/comments/:id")
  .put(Authentication, comment.putSingleCommentUpdateController)
  .patch(Authentication, comment.patchSingleCommentUpdateController)
  .delete(Authentication, comment.deleteSingleCommentDeleteController);

router
  .route("/comments")
  .get(comment.getCommentController)
  .post(Authentication, comment.postCommentCreateController);

module.exports = router;
