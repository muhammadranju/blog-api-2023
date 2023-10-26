const router = require("express").Router();
const controller = require("../../controller/user.controller/user.controller");

router.post("/signup", controller.postSignupController);

router.post("/login", controller.postLoginController);

module.exports = router;
