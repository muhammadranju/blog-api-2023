const router = require("express").Router();
const controller = require("../../controller/auth.controller/auth.controller");
const validator = require("../../middleware/validator.middleware/validator.middleware");

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
  .route("/users/reset-password/:resetToken")
  .post(controller.postResetForgotPassword);

router.get(
  "/users/verify-email/:verificationToken",
  controller.getVerifyEmailController
);

module.exports = router;
