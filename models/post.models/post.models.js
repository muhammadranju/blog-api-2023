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
    body: {
      type: String,
      require: true,
      trim: true,
    },
    cover_image: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["DRAFT,PUBLISHED,PENDING"],
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;
