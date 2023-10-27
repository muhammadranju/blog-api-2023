const router = require("express").Router();
const controller = require("../../controller/auth.controller/auth.controller");
router.post("/user/login", controller.postLoginController);
router.post("/user/signup", controller.postSignupController);
router.get("/user/verify/:verify", controller.getVerifyEmailController);

module.exports = router;
