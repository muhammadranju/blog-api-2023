const Comment = require("../../libs/comment.libs/comment.libs");
const Post = require("../../libs/post.libs/post.libs");

const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const getCommentController = asyncHandler(async (_req, res, next) => {
  const comment = await Comment.findAllComment();
  if (!comment.length) {
    throw new ApiResponse(404, "fail", "Comment not found");
  }
  return res.status(200).json({
    data: comment,
  });
});
const postCommentCreateController = asyncHandler(async (req, res) => {
  const { post, bodyText } = req.body;
  if (!post || !bodyText) {
    throw new ApiResponse(400, "fail", "Invalid comments parameters");
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
  const comment = await Comment.commentApprovedUpdate(id, status);
  if (!comment) {
    throw new ApiResponse(404, "fail", "Comment not found.");
  }
  return res.status(200).json(comment);
});

const patchSingleCommentUpdateController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { bodyText } = req.body;
  bodyText ?? bodyText;
  const comment = await Comment.commentUpdate(id, { bodyText });
  if (!comment) {
    throw new ApiResponse(404, "fail", "Comment not found.");
  }
  console.log(bodyText);

  return res.status(201).json(comment);
});
const deleteSingleCommentDeleteController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.commentDelete(id);
  if (!comment) {
    throw new ApiResponse(404, "fail", "Comment not found.");
  }
  return res.status(204).json(comment);
});

module.exports = {
  getCommentController,
  postCommentCreateController,
  putSingleCommentUpdateController,
  patchSingleCommentUpdateController,
  deleteSingleCommentDeleteController,
};
