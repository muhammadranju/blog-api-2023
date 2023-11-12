const router = require("express").Router();
const Authentication = require("../../middleware/authentication.middleware");
const Controller = require("../../controller/home.controller");
const restricted = require("../../middleware/restricted.middleware");

router.get(
  "/",
  Authentication,
  restricted("ADMIN", "MANAGER"),
  Controller.homeController
);

module.exports = router;
