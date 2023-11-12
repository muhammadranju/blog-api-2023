const router = require("express").Router();
const validator = require("../../middleware/validator.middleware/postValidator.middleware");
const Authentication = require("../../middleware/authentication.middleware");

const controller = require("../../controller/post.controller");

router
  .route("/articles/:id")
  .get(controller.getSingleArticleController)
  .put(Authentication, controller.putSingleArticlesUpdateController)
  .patch(Authentication, controller.patchSingleArticleUpdateController)
  .delete(Authentication, controller.deleteSingleArticlesDeleteController);

router
  .route("/articles")
  .get(controller.getArticlesController)
  .post(
    Authentication,
    validator.postValidator,
    controller.postArticleController
  );

module.exports = router;
