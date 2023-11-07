const router = require("express").Router();
const controller = require("../../controller/user.controller/user.controller");
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");

const { UserRolesEnum } = require("../../constants");
const restricted = require("../../middleware/restricted.middleware/restricted.middleware");

router
  .route("/user/:userId")
  .get(
    Authentication,
    restricted(UserRolesEnum.ADMIN, UserRolesEnum.MANAGER),
    controller.getUserSingleController
  )
  .put(
    Authentication,
    restricted(UserRolesEnum.ADMIN, UserRolesEnum.MANAGER),
    controller.putUserUpdateController
  )
  .patch(
    Authentication,
    restricted(UserRolesEnum.ADMIN, UserRolesEnum.MANAGER),
    controller.patchUserUpdateController
  );

router
  .route("/user/:userId/forgot-password")
  .post(
    Authentication,
    restricted(UserRolesEnum.ADMIN, UserRolesEnum.MANAGER),
    controller.userForgotPasswordController
  );

router
  .route("/user/:userId/reset-password")
  .patch(
    Authentication,
    restricted(UserRolesEnum.ADMIN, UserRolesEnum.MANAGER),
    controller.userChangePasswordController
  );

router
  .route("/user")
  .get(
    Authentication,
    restricted(UserRolesEnum.ADMIN, UserRolesEnum.MANAGER),
    controller.getUserController
  );
router
  .route("/user/signup")
  .post(
    Authentication,
    restricted(UserRolesEnum.ADMIN, UserRolesEnum.MANAGER),
    controller.postUserCreateController
  );

module.exports = router;
