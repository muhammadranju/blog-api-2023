const { Schema, model } = require("mongoose");
const constants = require("../../config/constants");
const commentSchema = new Schema(
  {
    author: {
      type: String,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: constants.ref.user,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: constants.ref.post,
    },
    bodyText: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: [
        constants.status.approved,
        constants.status.pending,
        constants.status.suspended,
      ],
      default: constants.status.pending,
    },
  },
  { timestamps: true }
);

const Comment = model(constants.ref.comment, commentSchema);

module.exports = Comment;
