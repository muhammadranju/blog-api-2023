const { body } = require("express-validator");
const User = require("../../libs/user.libs/user.libs");

const userRegisterValidator = () => {
  return [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Email field is required.")
      .isLength({ max: 40 })
      .withMessage("Email should be 40 characters only. ")
      .custom(async (username) => {
        username = username.split(" ").join("").toLowerCase();
        const existingUser = await User.findUsername({ username });
        if (existingUser) {
          throw new Error("Username is already an exists.");
        }
      }),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field is required.")
      .isLength({ max: 40 })
      .withMessage("Email should be 40 characters only. ")
      .isEmail()
      .withMessage("Email must be a valid email address.")
      .normalizeEmail()
      .custom(async (email) => {
        const existingUser = await User.findUserEmail({ email });
        if (existingUser) {
          throw new Error("Email is already an exists.");
        }
      }),
    body("fullName")
      .trim()
      .not()
      .notEmpty()
      .withMessage("First Name field is required.")
      .isLength({ min: 2, max: 30 })
      .withMessage("First Name at least Two or Six latter.")
      .isString()
      .withMessage("First name is must be alpha characters."),

    body("password")
      .trim()
      .not()
      .notEmpty()
      .withMessage("Password field is required.")
      .isLength({ min: 6 })
      .withMessage("The password must be at least 6 characters.")
      .isStrongPassword()
      .withMessage(
        "Password must be Strong include Number (12345) or (# $ % * & @) special characters."
      ),
    body("role").trim().isEmpty().withMessage("Role is required."),
  ];
};

module.exports = { userRegisterValidator };

// username: string;
//     fullName: string;
//     email: string;
//     password: string;
//     role: string;
//     status: string;
//     isVerify: boolean;
