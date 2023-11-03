const { Schema, model } = require("mongoose");
const constants = require("../../config/constants");
const postSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    title_url: {
      type: String,
      require: true,
    },
    bodyText: {
      type: String,
      require: true,
      trim: true,
    },
    cover: [
      {
        type: String,
        require: true,
      },
    ],
    tags: [
      {
        type: String,
        required: true,
        lowercase: true,
      },
    ],
    status: {
      type: String,
      enum: [
        constants.status.draft,
        constants.status.published,
        constants.status.pending,
      ],
      default: constants.status.draft,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;
