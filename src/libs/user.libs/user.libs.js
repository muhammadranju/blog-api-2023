const User = require("../../models/user.models/user.models");
const { roles, status, verifyStatus } = require("../../config/constants");

const findAllUsers = async (limit = 10) => {
  return await User.find().select("username email role").limit(limit);
};

const userCreate = async ({ username, fullName, email, password }) => {
  return new User({
    username,
    fullName,
    email,
    password,
    role: roles.user,
    status: status.pending,
    isVerify: verifyStatus.unverified,
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

const verifiedLink = async (id, updated) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { isVerify: Boolean(updated) },
    { new: true }
  );
};

module.exports = {
  findAllUsers,
  userCreate,
  findUserById,
  findUserEmail,
  findUsername,
  verifiedLink,
};
