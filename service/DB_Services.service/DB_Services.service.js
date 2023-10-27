const User = require("../../models/user.models");
// const user = new User({
//     username: lowercaseText(username),
//     fullName,
//     email: lowercaseText(email),
//     password: await hash.generateBcryptPassword(password),
//     roll,
//   });

/**
 *
 * @param {Object} value  value is return a object of value
 * @param {string} finderValue finderValue is return a string value is find witch on element are find
 * @returns if finderValue is not match then return false or null
 */

async function findOne(value, finderValue) {
  const findOneElement = await User.findOne(value);

  if (finderValue === "user") {
    return findOneElement;
  }
  if (finderValue === "signup") {
    return findOneElement;
  }
  return false;
}

/**
 *
 * @param {object} object provide hole object to create a document
 * @param {string} finderValue finderValue is return a string value is find witch on element are find
 * @returns if finderValue is not match then return false or null
 */
async function createDocument(object, finderValue) {
  const createDocuments = new User({ ...object });

  if (finderValue === "user") {
    return createDocuments;
  }
  return false;
}

async function findById(idValue, finderValue) {
  const result = await User.findById(idValue).select("-password");
  return result;
}
module.exports = { findOne, createDocument, findById };
