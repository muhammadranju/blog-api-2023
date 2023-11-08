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

const findUserId = async ({ id }) => {
  return await User.findById({ _id: id });
};

const findUser = async ({ email }) => {
  return await User.findOne({ email });
};

module.exports = { selectedUser, getAllUser, createUser, findUserId, findUser };
