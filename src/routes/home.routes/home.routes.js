const router = require("express").Router();
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
const Controller = require("../../controller");
const { checkAdmin } = require("../../middleware/checkAdmin/checkAdmin");

router.get("/", Authentication, checkAdmin, Controller.homeController);

module.exports = router;
