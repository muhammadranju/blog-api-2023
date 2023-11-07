const { validationResult } = require("express-validator");

const User = require("../../libs/user.libs/user.libs");
const jwt = require("../../service/jwtGenerator.service/jwtGenerator.service"); // jwt generator function
const EmailSend = require("../../service/emailSend.service/emailSend.service"); // email send function

const asyncHandler = require("../../utils/asyncHandler");
const { verifyStatus } = require("../../config/constants");
const hash = require("../../utils/passwordBcrypt.utils/passwordBcrypt.utils"); // password hash function
const response = require("../../utils/response.utils/response.utils"); // response handel function
const errorFormatter = require("../../utils/errorFormatter/errorFormatter"); // error formatter function

const postSignupController = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.mapped() });
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
    return res.status(400).json({ error: errors.mapped() });
  }
  const { email, password } = req.body;
  const findUserEmail = await User.findUserEmail({ email });

  if (!findUserEmail) {
    return response(res, "Invalid credential, email or password.", 400);
  }
  if (findUserEmail.isVerify === false) {
    return response(
      res,
      "You must be verify your email first. please try again later",
      400
    );
  }

  const compareBcryptPassword = await hash.compareBcryptPassword(
    password,
    findUserEmail.password
  );

  if (!compareBcryptPassword) {
    return response(res, "Invalid credential, email or password.", 400);
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
      return response(res, "Unauthorized access", 401);
    }
    const { email } = jwt.jwtVerifyToken(token);
    const findUser = await User.findUserEmail({ email });

    if (findUser.isVerify) {
      return response(res, "Email is already verify.", 400);
    }

    const user = await User.verifiedLink(findUser.id, {
      isVerify: verifyStatus.verify,
    });
    console.log(user);
    return response(res, "Successfully email verified.✅", 200);
  } catch (error) {
    console.log(error.message);
    return response(res, `Your verify token link was expired!!`, 400);
  }
};

const postForgotPassword = async (id) => {};

module.exports = {
  postSignupController,
  postLoginController,
  getVerifyEmailController,
  postForgotPassword,
};
