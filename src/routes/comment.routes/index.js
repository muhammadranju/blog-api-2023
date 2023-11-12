const router = require("express").Router();

const Authentication = require("../../middleware/authentication.middleware");
const comment = require("../../controller/comment.controller");

router
  .route("/comments/:id")
  .put(Authentication, comment.putSingleCommentUpdateController)
  .patch(Authentication, comment.patchSingleCommentUpdateController)
  .delete(Authentication, comment.deleteSingleCommentDeleteController);

router
  .route("/comments")
  .get(Authentication, comment.getCommentController)
  .post(Authentication, comment.postCommentCreateController);

module.exports = router;
