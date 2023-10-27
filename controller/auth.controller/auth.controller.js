const hash = require("../../utils/password_bcrypt.utils/password_bcrypt.utils");
const lowercaseText = require("../../utils/lowercase_text.utils/lowercase_text.utils");
const Service = require("../../service/DB_Services.service/DB_Services.service");
const jwt = require("../../service/jwt_generator.service/jwt_generator.service");
const response = require("../../utils/response.utils/response.utils");
const emailSend = require("../../service/emailSend.service/emailSend.service");

const User = require("../../models/user.models");

const postSignupController = async (req, res, next) => {
  try {
    const { username, fullName, email, password, roll } = req.body;

    if (!username || !fullName || !email || !password) {
      return response(res, "All fields are required!", 400);
    }
    const findUserEmail = await Service.findOne({ email }, "signup");
    if (findUserEmail) {
      return response(res, "This email already exits.", 400);
    }

    const user = await Service.createDocument(
      {
        username: lowercaseText(username),
        fullName,
        email: lowercaseText(email),
        password: await hash.generateBcryptPassword(password),
        roll,
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
    next(error);
  }
};

const postLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return response(res, "All fields are required!", 400);
    }
    const findUserEmail = await Service.findOne({ email }, "user");
    if (!findUserEmail) {
      return response(res, "Invalid user name or password.", 400);
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
      status: compareBcryptPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

const getVerifyEmailController = async (req, res, next) => {
  try {
    const token = req.params.verify;
    if (token === undefined) {
      return response(res, "Unauthorized access", 401);
    }
    const { email } = jwt.jwtVerifyToken(token);
    console.log(email);
    const findUser = await Service.findOne({ email }, "user");

    if (findUser.isVerify) {
      return response(res, "Email is already verify.", 200);
    }

    await User.findOneAndUpdate(
      { email },
      { $set: { isVerify: true } },
      { new: false }
    );
    return res.status(203).json({ message: "Successfully email verified.✅" });
  } catch (error) {
    return response(res, "Your verify link was expired!!", 400);
    next(error);
  }
};

module.exports = {
  postSignupController,
  postLoginController,
  getVerifyEmailController,
};
