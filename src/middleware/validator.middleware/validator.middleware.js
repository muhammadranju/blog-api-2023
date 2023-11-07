const { body } = require("express-validator");
const User = require("../../libs/user.libs/user.libs");

const ApiResponse = require("../../utils/ApiResponse");

const loginValidation = [
  body("email")
    .trim()
    .not()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Your must be provided a valid email.")
    .normalizeEmail(),
  body("password")
    .not()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password minimum 6 characters."),
];

const signupValidation = [
  //   body("phone")
  //     .trim()
  //     .not()
  //     .notEmpty()
  //     .withMessage("Number field is required.")
  //     .isMobilePhone("bn-BD")
  //     .withMessage("Invalid number, Number must be Bangladeshi Number.")
  //     .isLength({ min: 11 })
  //     .withMessage("Invalid number, Number must be Bangladeshi Number."),

  body("username")
    .trim()
    .not()
    .notEmpty()
    .withMessage("Email field is required.")
    .isLength({ max: 40 })
    .withMessage("Email should be 40 characters only. ")
    .custom(async (username) => {
      username = username.split(" ").join("").toLowerCase();
      const existingUser = await User.findUsername({ username });
      if (existingUser) {
        throw new ApiResponse(401, {}, "Username is already an exists.");
      }
    }),
  body("email")
    .trim()
    .not()
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
        throw new ApiResponse(401, {}, "Email is already an exists.");
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
];

module.exports = { loginValidation, signupValidation };
