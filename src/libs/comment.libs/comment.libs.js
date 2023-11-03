const Comment = require("../../models/comment.models/comment.models");
const findAllComment = async (filter) => {
  if (filter) {
    return await Comment.find({ filter });
  }
  const comment = await Comment.find().populate(
    "author post",
    "username title_url"
  );
  return comment;
};

const createComment = async ({ author, authorId, post, bodyText }) => {
  return new Comment({ author, authorId, post, bodyText });
};

const commentApprovedUpdate = async (id, status) => {
  return Comment.findByIdAndUpdate({ _id: id }, { status }, { new: true });
};

const findCommentIsApproved = async (id, status) => {
  return await Comment.find({
    $and: [{ ...id }, { ...status }],
  });
};

const commentUpdate = async (id, updates) => {
  return await Comment.findByIdAndUpdate(
    { _id: id },
    { ...updates },
    { new: true }
  );
};

const commentDelete = async (id) => {
  return await Comment.findByIdAndDelete({ _id: id });
};
module.exports = {
  findAllComment,
  createComment,
  commentUpdate,
  commentApprovedUpdate,
  findCommentIsApproved,
  commentDelete,
};
