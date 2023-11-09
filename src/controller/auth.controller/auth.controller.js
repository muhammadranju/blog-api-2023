const { validationResult } = require("express-validator");

const User = require("../../libs/user.libs/user.libs");
const ApiResponse = require("../../utils/ApiResponse");

// jwt generator function
const jwt = require("../../service/jwtGenerator.service/jwtGenerator.service");
// email send function
const EmailSend = require("../../service/emailSend.service/emailSend.service");

const asyncHandler = require("../../utils/asyncHandler");
const { verifyStatus } = require("../../config/constants");

// password hash function
const hash = require("../../utils/passwordBcrypt.utils/passwordBcrypt.utils");

// error formatter function
const errorFormatter = require("../../utils/errorFormatter/errorFormatter");

const postSignupController = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    throw new ApiResponse(400, {}, errors.mapped());
  }

  let { username, fullName, email, password } = req.body;
  username = username.split(" ").join("").toLowerCase();

  const user = await User.userCreate({
    username,
    fullName,
    email,
    password,
  });

  if (user) {
    EmailSend(email, fullName);
    await user.save();
  }

  return res.status(201).json({
    user,
    code: 201,
    message: "Signup successful",
    verify:
      "You must be verify your email before you login, Verify link will be expired in 30 minutes.",
    links: {
      self: "/auth/signup",
      signin: "/auth/signin",
    },
  });
});

const postLoginController = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    throw new ApiResponse(400, {}, errors.mapped());
  }
  const { email, password } = req.body;
  const findUserEmail = await User.findUserEmail({ email });

  if (!findUserEmail) {
    throw new ApiResponse(400, {}, "Invalid credential, email or password.");
  }
  if (findUserEmail.isVerify === false) {
    throw new ApiResponse(
      400,
      {},
      "You must be verify your email first. please try again later"
    );
  }

  const compareBcryptPassword = await hash.compareBcryptPassword(
    password,
    findUserEmail.password
  );

  if (!compareBcryptPassword) {
    throw new ApiResponse(400, {}, "Invalid credential, email or password.");
  }
  const payload = {
    user_id: findUserEmail._id,
    name: findUserEmail.fullName,
    email: findUserEmail.email,
    isLogin: compareBcryptPassword,
  };
  const token = jwt.jwtGeneratorSignToken(payload, "1d");
  return res.json({
    message: "User login successfully!",
    token,
    status: compareBcryptPassword,
  });
});

const getVerifyEmailController = async (req, res, next) => {
  try {
    const token = req.params.verify;

    if (token === undefined) {
      throw new ApiResponse(401, {}, "Unauthorized access");
    }
    const { email } = jwt.jwtVerifyToken(token);
    const findUser = await User.findUserEmail({ email });

    if (findUser.isVerify) {
      throw new ApiResponse(400, {}, "Email is already verify.");
    }

    const user = await User.verifiedLink(findUser.id, {
      isVerify: verifyStatus.verify,
    });
    console.log(user);
    return res
      .status(200)
      .json({ status: 200, message: "Successfully email verified.✅" });
  } catch (error) {
    throw new ApiResponse(400, {}, "Your verify token link was expired!!");
  }
};

const postForgotPassword = asyncHandler(async (req, res, next) => {});

module.exports = {
  postSignupController,
  postLoginController,
  getVerifyEmailController,
  postForgotPassword,
};
