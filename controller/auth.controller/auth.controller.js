const { validationResult } = require("express-validator");
const hash = require("../../utils/password_bcrypt.utils/password_bcrypt.utils");
const lowercaseText = require("../../utils/lowercase_text.utils/lowercase_text.utils");
const Service = require("../../service/DB_Services.service/DB_Services.service");
const jwt = require("../../service/jwt_generator.service/jwt_generator.service");
const response = require("../../utils/response.utils/response.utils");
const emailSend = require("../../service/emailSend.service/emailSend.service");
const errorFormatter = require("../../utils/errorFormatter/errorFormatter");

const postSignupController = async (req, res, next) => {
  try {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.mapped() });
    }

    const { username, fullName, email, password } = req.body;

    const user = await Service.createDocument(
      {
        username: lowercaseText(username),
        fullName,
        email: lowercaseText(email),
        password: await hash.generateBcryptPassword(password),
      },
      "user"
    );
    if (user) {
      emailSend(email, fullName);
      await user.save();
    }
    return res.status(201).json({
      success: "Signup successfully!",
      verify:
        "You must be verify your email before you login, Verify link will be expired in 30 minutes.",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const postLoginController = async (req, res, next) => {
  try {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.mapped() });
    }
    const { email, password } = req.body;

    // if (!email || !password) {
    //   return response(res, "All fields are required!", 400);
    // }
    const findUserEmail = await Service.findOne({ email }, "user");
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
    const token = jwt.jwtGeneratorSignToken(payload, "1h");
    return res.json({
      message: "User login successfully!",
      token,
      //   status: compareBcryptPassword,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getVerifyEmailController = async (req, res, _next) => {
  try {
    const token = req.params.verify;
    if (token === undefined) {
      return response(res, "Unauthorized access", 401);
    }
    const { email } = jwt.jwtVerifyToken(token);
    const findUser = await Service.findOne({ email }, "user");
    if (findUser.isVerify) {
      return response(res, "Email is already verify.", 400);
    }

    const isVerify = await Service.verifiedLink(
      { _id: findUser._id },
      { isVerify: true },
      "user",
      "findById"
    );
    console.log(isVerify);
    return response(res, "Successfully email verified.✅", 200);
  } catch (error) {
    console.log(error.message);
    return response(res, `Your verify token link was expired!!`, 400);
  }
};

module.exports = {
  postSignupController,
  postLoginController,
  getVerifyEmailController,
};
