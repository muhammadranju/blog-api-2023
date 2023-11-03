const router = require("express").Router();

const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
const comment = require("../../controller/comment.controller/comment.controller");

router.get("/comments", comment.getCommentController);

router.post("/comments", Authentication, comment.postCommentCreateController);

router.put(
  "/comments/:id",
  Authentication,
  comment.putSingleCommentUpdateController
);

router.patch(
  "/comments/:id",
  Authentication,
  comment.patchSingleCommentUpdateController
);

router.delete(
  "/comments/:id",
  Authentication,
  comment.deleteSingleCommentDeleteController
);

module.exports = router;
