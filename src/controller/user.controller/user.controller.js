const { createUser } = require("../../libs/User");

const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const getUserController = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

const getUserSingleController = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

const postUserCreateController = asyncHandler(async (req, res, next) => {
  try {
    const { username, fullName, email, password, role, status, isVerify } =
      req.body;
  } catch (error) {
    next(error);
  }
});
const putUserUpdateController = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

const patchUserUpdateController = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
const deleteUserDeleteController = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
const userForgotPasswordController = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
const userChangePasswordController = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getUserController,
  getUserSingleController,
  postUserCreateController,
  putUserUpdateController,
  patchUserUpdateController,
  deleteUserDeleteController,
  userForgotPasswordController,
  userChangePasswordController,
};
