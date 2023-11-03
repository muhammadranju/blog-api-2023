const User = require("../../models/user.models/user.models");
const { roles, status, verifyStatus } = require("../../config/constants");

const findAllUsers = async (limit = 10) => {
  const users = await User.find().select("username email role").limit(limit);
  return users;
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
  const user = await User.findOne({ email: email });
  return user;
};

const verifiedLink = async (id, updated) => {
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { isVerify: Boolean(updated) },
    { new: true }
  );
  return user;
};

module.exports = {
  findAllUsers,
  userCreate,
  findUserById,
  findUserEmail,
  verifiedLink,
};
