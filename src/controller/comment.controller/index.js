const Comment = require("../../libs/comment.libs");
const Post = require("../../libs/post.libs");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const getCommentController = asyncHandler(async (req, res, next) => {
  const { author } = req.query;

  if (author) {
    const comment = await Comment.findOneComment({ value: author });
    if (!comment) {
      throw new ApiResponse(404, { author }, "This comment was not found.");
    }
  }

  const comment = await Comment.findAllComment();
  if (!comment.length) {
    throw new ApiResponse(404, {}, "Comment was not available yet.");
  }
  return res.status(200).json({
    status: 200,
    data: comment,
  });
});

const postCommentCreateController = asyncHandler(async (req, res) => {
  const { post, bodyText } = req.body;
  if (!post || !bodyText) {
    throw new ApiResponse(400, {}, "Invalid comments parameters");
  }
  const comment = await Comment.createComment({
    author: req.user.username,
    authorId: req.user._id,
    post,
    bodyText,
  });

  await Post.pushCommentInPost({ _id: post }, { comments: comment._id });
  await comment.save();
  return res
    .status(201)
    .json({ message: "Comment created successfully.", comment });
});

const putSingleCommentUpdateController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const comment = await Comment.findComment({ id });

  if (!comment) {
    throw new ApiResponse(404, { id }, "Comment not found.");
  }
  comment.status = status ? status : comment.status;
  await comment.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json({ message: "Comment successfully updated.", comment });
});

const patchSingleCommentUpdateController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { bodyText } = req.body;

  bodyText ?? bodyText;

  const comment = await Comment.findComment({ id });
  if (!comment) {
    throw new ApiResponse(404, {}, "Comment not found.");
  }

  comment.bodyText = bodyText ? bodyText : comment.bodyText;
  await comment.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json({ status: 202, message: "Comment successfully updated." });
});
const deleteSingleCommentDeleteController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findComment({ id });
  if (!comment) {
    throw new ApiResponse(404, { id }, "Comment not found.");
  }
  await comment.deleteOne();

  return res
    .status(202)
    .json({ status: 204, message: "Comment successfully deleted." });
});

module.exports = {
  getCommentController,
  postCommentCreateController,
  putSingleCommentUpdateController,
  patchSingleCommentUpdateController,
  deleteSingleCommentDeleteController,
};
