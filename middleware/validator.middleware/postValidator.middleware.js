const { body } = require("express-validator");

const postValidator = [
  body("title")
    .trim()
    .not()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 3 })
    .withMessage("Title minimum 3 characters."),
  body("bodyText")
    .trim()
    .not()
    .notEmpty()
    .withMessage("Body is required.")
    .isLength({ min: 6 })
    .withMessage("Body minimum 6 characters."),
  body("tags")
    .trim()
    .not()
    .notEmpty()
    .withMessage("Tags is required.")
    .isLength({ min: 1 })
    .withMessage("Tags minimum 1."),
];

module.exports = { postValidator };
