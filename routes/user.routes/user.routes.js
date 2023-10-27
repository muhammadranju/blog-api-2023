const router = require("express").Router();
const controller = require("../../controller/user.controller/user.controller");
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");

router.get("/user", controller.getUserController);
router.get("/user/:userId", controller.getUserSingleController);
router.post("/user", Authentication, controller.postUserCreateController);
router.put("/user/:userId", Authentication, controller.putUserUpdateController);
router.patch(
  "/user/:userId",
  Authentication,
  controller.patchUserUpdateController
);
router.put(
  "/user/:userId/change-password",
  controller.userChangePasswordController
);

module.exports = router;
