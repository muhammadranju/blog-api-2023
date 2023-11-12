const { Schema, model } = require("mongoose");
const { UserCommentStatusEnum, ModelRefNames } = require("../../constants");
const commentSchema = new Schema(
  {
    author: {
      type: String,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: ModelRefNames.User,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: ModelRefNames.Post,
    },
    bodyText: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: [
        UserCommentStatusEnum.APPROVED,
        UserCommentStatusEnum.PENDING,
        UserCommentStatusEnum.SUSPENDED,
      ],
      default: UserCommentStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

const Comment = model(ModelRefNames.Comment, commentSchema);

module.exports = Comment;
