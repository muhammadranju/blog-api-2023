const { Schema, model } = require("mongoose");
const constants = require("../../config/constants");
const commentSchema = new Schema(
  {
    author: {
      type: String,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
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

const Comment = model("Comment", commentSchema);

module.exports = Comment;
