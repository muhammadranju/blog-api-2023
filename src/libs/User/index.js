const User = require("../../models/user.models/user.models");

// username: string;
//     fullName: string;
//     email: string;
//     password: string;
//     role: string;
//     status: string;
//     isVerify: boolean;

const createUser = async ({
  username,
  fullName,
  email,
  password,
  role,
  status,
  isVerify,
}) => {
  return await new User({
    username,
    fullName,
    email,
    password,
    role,
    status,
    isVerify,
  });
};

module.exports = { createUser };
