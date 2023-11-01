const router = require("express").Router();
const controller = require("../../controller/auth.controller/auth.controller");
const validator = require("../../middleware/validator.middleware/validator.middleware");

router.post(
  "/user/login",
  validator.loginValidation,
  controller.postLoginController
);
router.post(
  "/user/signup",
  validator.signupValidation,
  controller.postSignupController
);
router.get("/user/verify/:verify", controller.getVerifyEmailController);

module.exports = router;
