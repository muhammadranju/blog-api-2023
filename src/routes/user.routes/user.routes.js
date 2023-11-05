const router = require("express").Router();
const controller = require("../../controller/user.controller/user.controller");
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
const { checkAdmin } = require("../../middleware/checkAdmin/checkAdmin");
router
  .route("/user/:userId")
  .get(Authentication, checkAdmin, controller.getUserSingleController)
  .put(Authentication, checkAdmin, controller.putUserUpdateController)
  .patch(Authentication, checkAdmin, controller.patchUserUpdateController);

router.post(
  "/user/:userId/forgot-password",
  Authentication,
  checkAdmin,
  controller.userForgotPasswordController
);

router.patch(
  "/user/:userId/reset-password",
  Authentication,
  checkAdmin,
  controller.userChangePasswordController
);
router
  .route("/user")
  .get(Authentication, checkAdmin, controller.getUserController)
  .post(Authentication, checkAdmin, controller.postUserCreateController);

module.exports = router;
