const { Schema, model } = require("mongoose");

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
      enum: ["APPROVED", "PENDING"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
