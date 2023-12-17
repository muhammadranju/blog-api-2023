const { validationResult } = require("express-validator");
const shortId = require("shortid");

const Post = require("../../libs/post.libs");
const Comment = require("../../libs/comment.libs");

const { UserCommentStatusEnum } = require("../../constants");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const errorFormatter = require("../../utils/errorFormatter/errorFormatter");
const lowercaseText = require("../../utils/lowercaseText.utils/lowercaseText.utils");
const uploadOnCloudinary = require("../../utils/cloudinary.utils");

const myUtils = (title) => {
  const shortId3 = shortId().slice(0, 3);
  return (
    lowercaseText(title, " ", "-").slice(0, 20) +
    "-" +
    shortId3.toLowerCase().trim()
  );
};
/*========================================================================================== */

/**
 * THIS FUNCTION IS RETURN ALL OF ARTICLE POSTS METHOD
 */
const getArticlesController = asyncHandler(async (req, res, next) => {
  const { limit, page, search } = req.query;

  const posts = await Post.findAllPosts({
    page,
    limit,
    sort: { updatedAt: -1 },
    search,
  });

  if (posts.length === 0) {
    throw new ApiResponse(400, {}, "Post not available yet.");
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

/**
 * THIS FUNCTION IS RETURN CREATE ARTICLE POST METHOD
 */
const postArticleController = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  // if (!errors.isEmpty()) {
  //   throw new ApiResponse(400, {}, errors.mapped());
  // }

  let { title, bodyText, tags } = Object.assign({}, req.body);
  const title_url = myUtils(title);
  tags = lowercaseText(tags, " ");

  const coverLocalPath = req.files?.cover[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  const cover = await uploadOnCloudinary(coverLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const post = await Post.createPost({
    title,
    title_url,
    bodyText,
    cover: cover.url,
    coverImage: coverImage?.url || "",
    tags,
    author: req.user._id,
  });

  console.log(post);
  await post.save();

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

/**
 * THIS FUNCTION IS RETURN SINGLE ARTICLE POST METHOD
 */
const getSingleArticleController = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const findOnePost = await Post.findPost({ id });

  if (!findOnePost) {
    throw new ApiResponse(400, { title_url: id }, "Post not available yet.");
  }
  const comment = await Comment.findCommentIsApproved(
    { post: findOnePost.id },
    { status: UserCommentStatusEnum.APPROVED }
  );

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

/**
 * THIS FUNCTION IS RETURN UPDATE SINGLE ARTICLE POST METHOD
 */
const patchSingleArticleUpdateController = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    let { title, bodyText, cover, tags, status } = req.body;

    const post = await Post.findPost({ id });
    if (!post) {
      throw new ApiResponse(404, { title_url: id }, "The post was not found.");
    }
    title ?? title;
    bodyText ?? bodyText;
    cover ?? cover;
    tags ?? tags;
    status ?? status;

    const title_url = title ? myUtils(title) : post.title_url;
    tags = tags ? lowercaseText(tags, " ") : post.tags;

    post.title = title ? title : post.title;
    post.bodyText = bodyText ? bodyText : post.bodyText;
    post.title_url = title_url ? title_url : post.title_url;
    post.cover = cover ? cover : post.cover;
    post.tags = tags ? tags : post.tags;
    post.status = status ? status : post.status;

    await post.save({ validateBeforeSave: false });

    return res
      .status(202)
      .json({ status: 202, message: "Post Successfully updated." });
  }
);

/**
 * THIS FUNCTION IS RETURN SINGLE DELETE ARTICLE POST METHOD
 */
const deleteSingleArticlesDeleteController = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findPost({ id });

    if (!post) {
      throw new ApiResponse(404, { title_url: id }, "Post not available", 404);
    }
    await post.deleteOne();
    return res.status(202).json({
      status: 202,
      message: "Article deleted successfully.",
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
