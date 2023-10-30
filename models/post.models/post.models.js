const { Schema, model } = require("mongoose");

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
    cover: {
      type: String,
      require: true,
    },

    tags: [
      {
        type: String,
        required: true,
        lowercase: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "pending"],
      default: "draft",
    },
    authorID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;
