const router = require("express").Router();
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
const Controller = require("../../controller");
const restricted = require("../../middleware/restricted.middleware/restricted.middleware");

router.get(
  "/",
  Authentication,
  restricted("ADMIN", "MANAGER"),
  Controller.homeController
);

module.exports = router;
