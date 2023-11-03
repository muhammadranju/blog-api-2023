const router = require("express").Router();
const controller = require("../../controller/user.controller/user.controller");
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
const { checkAdmin } = require("../../middleware/checkAdmin/checkAdmin");

router.get("/user", Authentication, checkAdmin, controller.getUserController);
router.get(
  "/user/:userId",
  Authentication,
  checkAdmin,
  controller.getUserSingleController
);
router.post(
  "/user",
  Authentication,
  checkAdmin,
  controller.postUserCreateController
);
router.put(
  "/user/:userId",
  Authentication,
  checkAdmin,
  controller.putUserUpdateController
);
router.patch(
  "/user/:userId",
  Authentication,
  checkAdmin,
  controller.patchUserUpdateController
);
router.put(
  "/user/:userId/change-password",
  Authentication,
  checkAdmin,
  controller.userChangePasswordController
);

module.exports = router;
