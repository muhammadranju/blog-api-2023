const User = require("../../models/user.models/user.models");

const selectedUser = async (flag) => {
  return await User.find({
    $or: [
      { status: flag },
      { role: flag },
      { email: flag },
      { username: flag },
    ],
  }).select("-password -__v ");
};

const getAllUser = async () => {
  return await User.find().select("-password -__v ");
};

const createUser = async ({
  username,
  fullName,
  email,
  password,
  role,
  status,
  isVerify,
}) => {
  return new User({
    username,
    fullName,
    email,
    password,
    role,
    status,
    isVerify,
  });
};

const findUserId = async ({ userId }) => {
  return await User.findById({ _id: userId });
};

const findUser = async ({ value }) => {
  return await User.findOne({
    $or: [{ username: value }, { email: value }],
  }).select("-password -__v");
};

module.exports = { selectedUser, getAllUser, createUser, findUserId, findUser };
