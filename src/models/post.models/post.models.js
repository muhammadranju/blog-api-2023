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
    coverImage: {
      type: String,
      // require: true,
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
      ref: constants.ref.user,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: constants.ref.comment,
      },
    ],
  },
  { timestamps: true }
);

const Post = model(constants.ref.post, postSchema);

module.exports = Post;
