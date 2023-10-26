const hash = require("../../utils/password_bcrypt.utils/password_bcrypt.utils");
const lowercaseText = require("../../utils/lowercase_text.utils/lowercase_text.utils");
const Service = require("../../service/user.service/user.service");
const jwt = require("../../service/jwt_generator.service/jwt_generator.service");
const response = require("../../utils/response.utils/response.utils");

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
    // await user.save();
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const postLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return response(res, "This email already exits.", 400);
    }
    const findUserEmail = await Service.findOne({ email }, "user");
    if (!findUserEmail) {
      return response(res, "Invalid user name or password.", 400);
    }
    console.log(findUserEmail);
    const compareBcryptPassword = await hash.compareBcryptPassword(
      password,
      findUserEmail.password
    );

    const payload = {
      user_id: findUserEmail._id,
      name: findUserEmail.fullName,
      email: findUserEmail.email,
    };
    const token = jwt.jwtGeneratorSignToken(payload);
    return res.json({
      message: "User login successfully!",
      token,
      status: compareBcryptPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postSignupController, postLoginController };
