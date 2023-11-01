const Comment = require("../../models/comment.models/comment.models");
const findAllComment = async () => {
  const comment = await Comment.find();
  return comment;
};

const createComment = async ({ author, post, bodyText }) => {
  const comment = new Comment({ author, post, bodyText });
  return comment;
};

module.exports = { findAllComment, createComment };
