const User = require("../../models/user.models");

// this function will return with given flag to find all user or single user
// this function only can use admin
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

// this function will return all of user in database
// this function only can use admin
const getAllUser = async () => {
  return await User.find().select("-password -__v ");
};

// this function will create user with role, status and email verify by default
// this function only can use admin
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

// this function will return user id within given userId
// this function only can use admin
const findUserId = async ({ userId }) => {
  return await User.findById({ _id: userId });
};

const findUser = async ({ value }) => {
  return await User.findOne({
    $or: [{ username: value }, { email: value }],
  }).select("-password -__v");
};

module.exports = { selectedUser, getAllUser, createUser, findUserId, findUser };
