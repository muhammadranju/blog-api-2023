const Comment = require("../../models/comment.models");

const findAllComment = async (filter) => {
  if (filter) {
    return await Comment.find({ filter });
  }
  return await Comment.find().populate("author post", "username title_url");
};

const findComment = async ({ id }) => {
  return await Comment.findById({ _id: id });
};

const findOneComment = async ({ value }) => {
  return await Comment.findOne({ author: value });
};

const createComment = async ({ author, authorId, post, bodyText }) => {
  return new Comment({ author, authorId, post, bodyText });
};

const findCommentIsApproved = async (id, status) => {
  return await Comment.find({
    $and: [{ ...id }, { ...status }],
  });
};

module.exports = {
  findAllComment,
  createComment,
  findOneComment,
  findComment,
  findCommentIsApproved,
};
