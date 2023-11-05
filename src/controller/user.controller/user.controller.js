const { createUser } = require("../../libs/User");

const getUserController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getUserSingleController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const postUserCreateController = async (req, res, next) => {
  try {
    const { username, fullName, email, password, role, status, isVerify } =
      req.body;
  } catch (error) {
    next(error);
  }
};
const putUserUpdateController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const patchUserUpdateController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const deleteUserDeleteController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const userForgotPasswordController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const userChangePasswordController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

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
