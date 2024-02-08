const router = require("express").Router();
const validator = require("../../middleware/validator.middleware/postValidator.middleware");
const Authentication = require("../../middleware/authentication.middleware");

const controller = require("../../controller/post.controller");

const upload = require("../../middleware/multer.middleware");

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
    upload.fields([
      {
        name: "cover",
        maxCount: 1,
      },
      {
        name: "coverImage",
        maxCount: 1,
      },
    ]),
    controller.postArticleController
  );

router.route("/demo/:tags").get(controller.demoPostController);

module.exports = router;
