const User = require("../../libs/User");

const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const {
  UserStatusEnum,
  UserRolesEnum,
  VerifyStatus,
} = require("../../constants");

const getUserController = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.getAllUser();
    return res.status(200).json({
      user,
    });
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
    const { username, fullName, email, password, role } = req.body;

    if (!username || !fullName || !email || !password || !role) {
      throw new ApiResponse(400, {}, "Invalid input parameters!");
    }

    const findUserEmail = await User.findUser({ email });

    if (findUserEmail) {
      throw new ApiResponse(
        400,
        { email },
        `This Email (${email}) is already exits!`
      );
    }

    const user = await User.createUser({
      username,
      fullName,
      email,
      password,
      role,
      status: UserStatusEnum.APPROVED,
      isVerify: VerifyStatus.verify,
    });
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
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
