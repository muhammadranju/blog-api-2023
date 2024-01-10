const { Schema, model } = require("mongoose");
const { PostStatusEnum, ModelRefNames } = require("../../constants");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
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
        PostStatusEnum.DRAFT,
        PostStatusEnum.PUBLISHED,
        PostStatusEnum.PENDING,
      ],
      default: PostStatusEnum.DRAFT,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: ModelRefNames.User,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelRefNames.Comment,
      },
    ],
  },
  { timestamps: true }
);

postSchema.plugin(mongooseAggregatePaginate);

const Post = model(ModelRefNames.Post, postSchema);

module.exports = Post;
