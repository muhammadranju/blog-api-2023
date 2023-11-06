const { validationResult } = require("express-validator");
const shortId = require("shortid");

const Post = require("../../libs/post.libs/post.libs");
const Comment = require("../../libs/comment.libs/comment.libs");

const constants = require("../../config/constants");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const errorFormatter = require("../../utils/errorFormatter/errorFormatter");
const lowercaseText = require("../../utils/lowercaseText.utils/lowercaseText.utils");

const myUtils = (title) => {
  const shortId3 = shortId().slice(0, 3);
  return (
    lowercaseText(title, " ", "-").slice(0, 20) +
    "-" +
    shortId3.toLowerCase().trim()
  );
};
/*========================================================================================== */

const getArticlesController = asyncHandler(async (req, res, next) => {
  const { limit, page, search } = req.query;

  const posts = await Post.findAllPosts({
    page,
    limit,
    sort: { updatedAt: -1 },
    search,
  });

  if (posts.length === 0) {
    throw new ApiResponse(404, "fail", "The post was not found");
  }

  return res.status(200).json({
    data: posts,
    pagination: {
      page,
      limit,
      next: 3,
      prev: 1,
      totalPage: 5,
      totalItems: 50,
    },
    links: {
      self: `/articles?page=2&limit=10`,
      next: "/articles?page=3&limit=10",
      prev: "/articles?page=1&limit=10",
    },
  });
});

const postArticleController = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.mapped() });
  }

  let { title, bodyText, cover, tags } = req.body;

  const title_url = myUtils(title);

  tags = lowercaseText(tags, " ");

  const post = await Post.createPost({
    title,
    title_url,
    bodyText,
    cover,
    tags,
    author: req.user._id,
  });

  // await post.save();

  return res.status(201).json({
    code: 201,
    message: "Article created successfully",
    data: post,
    links: {
      self: `/articles/${post.title_url}`,
      author: `/articles/${req.user.username}/author`,
      comments: `/articles/1/comments`,
    },
  });
});

const getSingleArticleController = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const findOnePost = await Post.findSinglePost({ id });
  if (!findOnePost) {
    throw new ApiResponse(404, "fail", "This post not was found.");
  }
  const comment = await Comment.findCommentIsApproved(
    { post: findOnePost.id },
    { status: constants.status.approved }
  );
  console.log(comment);

  return res.status(200).json({
    data: findOnePost,
    comments: comment,
    links: {
      self: `/api/v1/articles/${id}`,
      author: `/articles/${id}/${findOnePost.author.username}`,
      comments: `/articles/${id}/comments`,
    },
  });
});
const putSingleArticlesUpdateController = asyncHandler(
  async (req, res, next) => {}
);

const patchSingleArticleUpdateController = asyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    let { title, bodyText, cover, tags, status } = req.body;
    title ?? title;
    bodyText ?? bodyText;
    cover ?? cover;
    tags ?? tags;
    status ?? status;

    const title_url = myUtils(title);

    tags = lowercaseText(tags, " ");

    const post = await Post.updatePost(
      { _id: id },
      title,
      title_url,
      bodyText,
      cover,
      tags,
      status
    );

    console.log(post);
    return res.status(201).json(post);
  }
);

const deleteSingleArticlesDeleteController = asyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const postDelete = await Post.findPostAndDelete({ id });
    if (!postDelete) {
      throw new ApiResponse(404, "fail", "Post not available", 404);
    }
    console.log("Article deleted successfully");
    return res.status(204).json({
      postDelete,
      status: 204,
      message: "Article deleted successfully",
    });
  }
);

module.exports = {
  getArticlesController,
  postArticleController,
  getSingleArticleController,
  putSingleArticlesUpdateController,
  patchSingleArticleUpdateController,
  deleteSingleArticlesDeleteController,
};
