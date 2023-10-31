const router = require("express").Router();
const validator = require("../../middleware/validator.middleware/postValidator.middleware");
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");

const controller = require("../../controller/post.controller/post.controller");

// router.get("/articles/:id/comment",controller.);
// router.post("/articles/:id/comment"controller.);
// router.get("/articles/:id/author"controller.);

router.put(
  "/articles/:id",
  Authentication,
  controller.putSingleArticlesUpdateController
);
router.patch(
  "/articles/:id",
  Authentication,
  controller.patchSingleArticleUpdateController
);
router.delete(
  "/articles/:id",
  Authentication,
  controller.deleteSingleArticlesDeleteController
);

router.get("/articles", controller.getArticlesController);
router.get("/articles/:id", controller.getSingleArticleController);
router.post(
  "/articles",
  Authentication,
  validator.postValidator,
  controller.postArticleController
);

module.exports = router;
