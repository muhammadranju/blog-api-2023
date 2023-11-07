const User = require("../../models/user.models/user.models");
const ApiResponse = require("../../utils/ApiResponse");

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

module.exports = { createUser, findUserId, findUser };
