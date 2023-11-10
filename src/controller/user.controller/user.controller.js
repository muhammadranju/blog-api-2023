const User = require("../../libs/User");
const { UserStatusEnum, VerifyStatus } = require("../../constants");

const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const getUserController = asyncHandler(async (req, res, next) => {
  const { flag } = req.query;
  const { email, username } = req.body;
  if (flag || email || username) {
    const selectUser = await User.selectedUser(flag || email || username);

    if (selectUser.length === 0) {
      throw new ApiResponse(
        404,
        { status: flag || email || username },
        `This status user not have yet.`
      );
    }
    return res.status(200).json({
      user: selectUser,
    });
  }

  const user = await User.getAllUser();
  return res.status(200).json({
    user,
  });
});

const getUserSingleController = asyncHandler(async (req, res, next) => {
  const { userId: value } = req.params;
  const user = await User.findUser({ value });

  if (user === null) {
    throw new ApiResponse(404, { user: value }, `Con't find this user yet.`);
  }
  return res.status(200).json({ user });
});

const postUserCreateController = asyncHandler(async (req, res, next) => {
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
});

const putUserUpdateController = asyncHandler(async (req, res, next) => {});

const patchUserUpdateController = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { username, fullName, status, role } = req.body;
  // if value comes in body
  username ?? username;
  fullName ?? fullName;
  status ?? status;
  role ?? role;

  const findUser = await User.findUser({ value: username });

  if (findUser) {
    throw new ApiResponse(400, { username }, "This username is already taken.");
  }
  const user = await User.findUserId({ userId });

  if (!user) {
    throw new ApiResponse(400, { userId }, "This user id not found.");
  }
  user.username = username ? username : user.username;
  user.fullName = fullName ? fullName : user.fullName;
  user.status = status ? status : user.status;
  user.role = role ? role : user.role;

  await user.save({ validateBeforeSave: false });
  return res.status(201).json({
    status: 201,
    message: "Successfully update information.",
  });
});
const deleteUserDeleteController = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findUserId({ userId });
  if (!user) {
    throw new ApiResponse(404, {}, "This user not available yet.");
  }
  await user.deleteOne();
  return res
    .status(202)
    .json({ status: 204, message: "Successfully user deleted." });
});
const userForgotPasswordController = asyncHandler(async (req, res, next) => {});
const userChangePasswordController = asyncHandler(async (req, res, next) => {});

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
