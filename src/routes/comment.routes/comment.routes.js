const router = require("express").Router();
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
const comment = require("../../controller/comment.controller/comment.controller");
router.get("/comments", comment.getCommentController);
router.post("/comments", Authentication, comment.postCommentCreateController);
router.patch("/comments/:id", Authentication);
router.delete("/comments/:id", Authentication);

module.exports = router;
