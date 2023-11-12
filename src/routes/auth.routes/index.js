const router = require("express").Router();
const controller = require("../../controller/auth.controller");
const validator = require("../../middleware/validator.middleware/validator.middleware");
const Authentication = require("../../middleware/authentication.middleware");

router
  .route("/users/verify-email/:verificationToken")
  .get(controller.getVerifyEmailController);

router
  .route("/users/reset-password/:resetToken")
  .post(controller.postResetForgotPassword);

router.post(
  "/auth/login",
  validator.loginValidation,
  controller.postLoginController
);
router.post(
  "/auth/signup",
  validator.signupValidation,
  controller.postSignupController
);

router.route("/users/forgot-password").post(controller.postForgotPassword);
router
  .route("/users/change-password")
  .post(Authentication, controller.postChangePassword);

module.exports = router;
