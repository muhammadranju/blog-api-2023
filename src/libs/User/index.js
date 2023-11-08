const User = require("../../models/user.models/user.models");

const getAllUser = async (value) => {
  return await User.find({ status: value }).select("-password -__v ");
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

module.exports = { getAllUser, createUser, findUserId, findUser };
