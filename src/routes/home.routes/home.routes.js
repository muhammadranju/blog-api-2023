const router = require("express").Router();
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
const Controller = require("../../controller");

router.get("/", Authentication, Controller.homeController);

module.exports = router;
