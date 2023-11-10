const User = require("../../models/user.models/user.models");
const {
  UserRolesEnum,
  UserStatusEnum,
  VerifyStatus,
} = require("../../constants");

const findAllUsers = async (limit = 10) => {
  return await User.find().select("username email role").limit(limit);
};

const userCreate = async ({ username, fullName, email, password }) => {
  return new User({
    username,
    fullName,
    email,
    password,
    role: UserRolesEnum.USER,
    status: UserStatusEnum.PENDING,
    isVerify: VerifyStatus.unverified,
  });
};

const findUserById = async (id) => {
  return await User.findById({ _id: id });
};
const findUserEmail = async ({ email }) => {
  return await User.findOne({ email: email });
};
const findUsername = async ({ username }) => {
  return await User.findOne({ username: username });
};

// this method only Verify user email on database
const findUserVerify = async ({ value }) => {
  return await User.findOne({
    emailVerificationToken: value,
    emailVerificationExpiry: { $gt: Date.now() },
  });
};

module.exports = {
  findAllUsers,
  userCreate,
  findUserById,
  findUserEmail,
  findUsername,
  findUserVerify,
};
