const User = require("../../models/user.models/user.models");
const Post = require("../../models/post.models/post.models");
const Comment = require("../../models/comment.models/comment.models");

// const user = new User({
//     username: lowercaseText(username),
//     fullName,
//     email: lowercaseText(email),
//     password: await hash.generateBcryptPassword(password),
//     roll,
//   });

/**
 *
 * @param {*} select
 * @param {*} limit
 * @param {*} sort
 * @returns
 */
async function find(finderValue, select, limit, sort, populate, popSelect) {
  const authData = await User.find().select(select).limit(limit).sort(sort);
  const postData = await Post.find()
    .select(select)
    .limit(limit)
    .sort(sort)
    .populate(populate, popSelect);
  const commentData = await Comment.find()
    .select(select)
    .limit(limit)
    .sort(sort);

  if (finderValue === "user") {
    return authData;
  }
  if (finderValue === "post") {
    return postData;
  }
  if (finderValue === "comment") {
    return commentData;
  }
  return false;
}

/**
 *
 * @param {Object} value  value is return a object of value
 * @param {string} finderValue finderValue is return a string value is find witch on element are find
 * @returns if finderValue is not match then return false or null
 */

async function findOne(value, finderValue) {
  const authData = await User.findOne(value);
  const postData = await Post.findOne(value);
  const commentData = await Comment.findOne(value);

  if (finderValue === "user") {
    return authData;
  }
  if (finderValue === "post") {
    return postData;
  }
  if (finderValue === "comment") {
    return commentData;
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
  const authCreateDocuments = new User({ ...object });
  const postCreateDocuments = new Post({ ...object });
  const commentCreateDocuments = new Comment({ ...object });

  if (finderValue === "user") {
    return authCreateDocuments;
  }
  if (finderValue === "post") {
    return postCreateDocuments;
  }
  if (finderValue === "comment") {
    return commentCreateDocuments;
  }
  return false;
}

async function findById(idValue, finderValue) {
  const authData = await User.findById(idValue).select(
    "username fullName email role isVerify:"
  );
  const postData = await Post.findById(idValue);
  const commentData = await Comment.findById(idValue);

  if (finderValue === "user") {
    return authData;
  }
  if (finderValue === "post") {
    return postData;
  }
  if (finderValue === "comment") {
    return commentData;
  }
}

/**
 *
 * @param {*} idValue
 * @param {*} updateValue
 * @param {*} finderValue
 * @param {string} findBy this value is findById or findByOne
 */
async function verifiedLink(idValue, updateValue, finderValue, findBy) {
  if (!finderValue || !findBy) {
    return false;
  }
  const resultFindById = await User.findByIdAndUpdate(
    idValue,
    { ...updateValue },
    { new: true }
  );

  const resultFindByOne = await User.findOneAndUpdate(
    { ...idValue },
    { ...updateValue },
    { new: true }
  );

  if (findBy === "findById") {
    if (finderValue === "user") {
      return resultFindById;
    }
  }

  if (findBy === "findByOne") {
    if (finderValue === "user") {
      return resultFindByOne;
    }
  }
}

module.exports = { find, findOne, createDocument, findById, verifiedLink };
