const Comment = require("../../libs/comment.libs/comment.libs");
const Post = require("../../libs/post.libs/post.libs");

const response = require("../../utils/response.utils/response.utils");

const getCommentController = async (req, res, next) => {
  try {
    const comment = await Comment.findAllComment();
    if (!comment.length) {
      return response(res, "Comment not found", 404);
    }

    return res.status(200).json({
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};
const postCommentCreateController = async (req, res, next) => {
  try {
    const { author, post, bodyText } = req.body;
    if (!post || !bodyText) {
      return response(res, "Invalid comments parameters", 400);
    }
    const comment = await Comment.createComment({
      author: req.user.username,
      authorId: req.user._id,
      post,
      bodyText,
    });

    await Post.pushCommentInPost({ _id: post }, { comments: comment._id });
    // findPost.save({ comments: comment._id });
    await comment.save();
    return res
      .status(201)
      .json({ message: "Comment created successfully.", comment });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const putSingleCommentUpdateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const comment = await Comment.commentApprovedUpdate(id, status);
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const patchSingleCommentUpdateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bodyText } = req.body;
    bodyText ?? bodyText;
    const comment = await Comment.commentUpdate(id, { bodyText });
    console.log(bodyText);

    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};
const deleteSingleCommentDeleteController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.commentDelete(id);
    return res.status(204).json(comment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommentController,
  postCommentCreateController,
  putSingleCommentUpdateController,
  patchSingleCommentUpdateController,
  deleteSingleCommentDeleteController,
};
