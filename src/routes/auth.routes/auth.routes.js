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

router.route("/auth/forgot-password").post();

router.get("/user/verify/:verify", controller.getVerifyEmailController);

module.exports = router;
