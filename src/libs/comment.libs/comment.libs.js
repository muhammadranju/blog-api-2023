const Comment = require("../../models/comment.models/comment.models");
const findAllComment = async (filter) => {
  if (filter) {
    const comment = await Comment.find({ filter });
    return comment;
  }
  const comment = await Comment.find().populate(
    "author post",
    "username title_url"
  );
  return comment;
};

const createComment = async ({ author, authorId, post, bodyText }) => {
  const comment = new Comment({ author, authorId, post, bodyText });
  return comment;
};

const commentApprovedUpdate = async (id, status) => {
  return Comment.findByIdAndUpdate({ _id: id }, { status });
};

const commentUpdate = async () => {};
module.exports = { findAllComment, createComment, commentApprovedUpdate };
