const { validationResult } = require("express-validator");
const crypto = require("crypto");
const User = require("../../libs/user.libs/user.libs");
const ApiResponse = require("../../utils/ApiResponse");
// jwt generator function
const jwt = require("../../service/jwtGenerator.service/jwtGenerator.service");
// email send function
const {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
} = require("../../service/emailSend.service/emailSend.service");
const asyncHandler = require("../../utils/asyncHandler");
const { VerifyStatus, UserStatusEnum } = require("../../constants");
const errorFormatter = require("../../utils/errorFormatter/errorFormatter");
// error formatter function

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

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  if (user) {
    await user.save();
    sendEmail({
      email: user?.email,
      subject: "Please verify your email",
      mailgenContent: emailVerificationMailgenContent(
        user.fullName,
        `${req.protocol}://${req.get(
          "host"
        )}/api/v1/users/verify-email/${unHashedToken}`
      ),
    });
  }

  return res.status(201).json({
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
  const user = await User.findUserEmail({ email });

  if (!user) {
    throw new ApiResponse(400, {}, "Invalid credential, email or password.");
  }

  if (user.isVerify === false) {
    throw new ApiResponse(
      400,
      {},
      "You must be verify your email first. please try again later"
    );
  }

  const isMatch = await user.compareBcryptPassword(password, user.password);
  console.log(isMatch);

  if (!isMatch) {
    throw new ApiResponse(400, {}, "Invalid credential, email or password.");
  }
  const payload = {
    user_id: user._id,
    name: user.fullName,
    email: user.email,
    isLogin: isMatch,
  };
  const token = jwt.jwtGeneratorSignToken(payload, "1d");

  return res.json({
    message: "User login successfully!",
    token,
    status: isMatch,
  });
});

const getVerifyEmailController = asyncHandler(async (req, res, next) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new ApiResponse(400, {}, "Email verification token is missing");
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.userEmailVerify({ value: hashedToken });

  if (!user) {
    throw new ApiResponse(409, {}, "Token is invalid or expired");
  }

  // If we found the user that means the token is valid
  // Now we can remove the associated email token and expiry date as we no  longer need them
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  // Tun the email verified flag to `true`
  user.isVerify = VerifyStatus.VERIFY;
  user.status = UserStatusEnum.APPROVED;
  await user.save({ validateBeforeSave: false });

  console.log(user);
  return res
    .status(200)
    .json({ status: 200, message: "Successfully email verified.✅" });
});

const postForgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findUserEmail({ email });
  if (!user) {
    throw new ApiResponse(404, {}, "User does not exists");
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;

  if (user) {
    await user.save({ validateBeforeSave: false });
    sendEmail({
      email: user?.email,
      subject: "Password reset request",
      mailgenContent: forgotPasswordMailgenContent(
        user.fullName,

        // ! NOTE: Following link should be the link of the frontend page responsible to request password reset
        // ! Frontend will send the below token with the new password in the request body to the backend reset password endpoint
        // * Ideally take the url from the .env file which should be teh url of the frontend
        `${req.protocol}://${req.get(
          "host"
        )}/api/v1/users/reset-password/${unHashedToken}`
      ),
    });
  }
  console.log(user);

  return res.status(200).json({
    status: 200,
    message: "Password reset mail has been sent on your mail id",
  });
});
const postResetForgotPassword = asyncHandler(async (req, res, next) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  if (!newPassword) {
    throw new ApiResponse(409, {}, "Pl");
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.userPasswordVerify({ value: hashedToken });

  if (!user) {
    throw new ApiResponse(409, {}, "Token is invalid or expired");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  console.log(user);
  res.status(200).json({ message: "Okk", user });
});

const postChangePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, conformPassword } = req.body;

  if (newPassword !== conformPassword) {
    console.log("okk");
    throw new ApiResponse(400, {}, "Password or Conform Password don't match.");
  }

  const user = await User.findUserById(req.user._id);

  const isMatch = await user.compareBcryptPassword(oldPassword, user.password);
  if (!isMatch) {
    throw new ApiResponse(400, {}, "Password don't match.");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  console.log(user);
  return res
    .status(200)
    .json({ status: 200, message: "Password successfully change." });
});

module.exports = {
  postSignupController,
  postLoginController,
  getVerifyEmailController,
  postForgotPassword,
  postResetForgotPassword,
  postChangePassword,
};
