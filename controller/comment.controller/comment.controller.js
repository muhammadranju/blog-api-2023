const Comment = require("../../libs/comment.libs/comment.libs");
const response = require("../../utils/response.utils/response.utils");

const getCommentController = async (req, res, next) => {
  try {
    const comment = Comment.findAllComment();
    if (!comment || Object.keys(comment)) {
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
  } catch (error) {
    next(error);
  }
};
const putSingleCommentUpdateController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const deleteSingleCommentDeleteController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommentController,
  postCommentCreateController,
  putSingleCommentUpdateController,
  deleteSingleCommentDeleteController,
};
