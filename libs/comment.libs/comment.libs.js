const Comment = require("../../models/comment.models/comment.models");
const findAllComment = async () => {
  const comment = await Comment.find().select("-__v");
  return comment;
};

module.exports = { findAllComment };
