const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    authorID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    body_text: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
