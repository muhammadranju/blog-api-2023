const router = require("express").Router();
const controller = require("../../controller/user.controller/user.controller");
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");

const { UserRolesEnum } = require("../../constants");
const restricted = require("../../middleware/restricted.middleware/restricted.middleware");

router
  .route("/user/:userId")
  .get(
    Authentication,
    restricted(
      UserRolesEnum.ADMIN,
      UserRolesEnum.MANAGER,
      UserRolesEnum.EDITOR
    ),
    controller.getUserSingleController
  )
  .put(
    Authentication,
    restricted(
      UserRolesEnum.ADMIN,
      UserRolesEnum.MANAGER,
      UserRolesEnum.EDITOR
    ),
    controller.putUserUpdateController
  )
  .patch(
    Authentication,
    restricted(
      UserRolesEnum.ADMIN,
      UserRolesEnum.MANAGER,
      UserRolesEnum.EDITOR
    ),
    controller.patchUserUpdateController
  )
  .delete(
    Authentication,
    restricted(
      UserRolesEnum.ADMIN,
      UserRolesEnum.MANAGER,
      UserRolesEnum.EDITOR
    ),
    controller.deleteUserDeleteController
  );

router
  .route("/user/:userId/forgot-password")
  .post(
    Authentication,
    restricted(
      UserRolesEnum.ADMIN,
      UserRolesEnum.MANAGER,
      UserRolesEnum.EDITOR
    ),
    controller.userForgotPasswordController
  );

router
  .route("/user/:userId/reset-password")
  .patch(
    Authentication,
    restricted(
      UserRolesEnum.ADMIN,
      UserRolesEnum.MANAGER,
      UserRolesEnum.EDITOR
    ),
    controller.userChangePasswordController
  );

router
  .route("/user")
  .get(
    Authentication,
    restricted(
      UserRolesEnum.ADMIN,
      UserRolesEnum.MANAGER,
      UserRolesEnum.EDITOR
    ),
    controller.getUserController
  );
router
  .route("/user/signup")
  .post(
    Authentication,
    restricted(
      UserRolesEnum.ADMIN,
      UserRolesEnum.MANAGER,
      UserRolesEnum.EDITOR
    ),
    controller.postUserCreateController
  );

module.exports = router;
