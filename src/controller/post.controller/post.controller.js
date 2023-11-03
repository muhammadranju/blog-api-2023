const { validationResult } = require("express-validator");
const NodeCache = require("node-cache");
const shortId = require("shortid");

const Post = require("../../libs/post.libs/post.libs");
const Service = require("../../service/DB_Services.service/DB_Services.service");
const errorFormatter = require("../../utils/errorFormatter/errorFormatter");
const lowercaseText = require("../../utils/lowercase_text.utils/lowercase_text.utils");
const response = require("../../utils/response.utils/response.utils");
const defaults = require("../../config/defaults");
const Comment = require("../../models/comment.models/comment.models");
const myCache = new NodeCache({ stdTTL: 60 });

const getArticlesController = async (req, res, next) => {
  // const page = req.query.page || defaults.page;
  // const limit = req.query.limit || defaults.limit;
  // const sortType = req.query.sort_type || defaults.sortType;
  // const sortBy = req.query.sort_by || defaults.sortBy;
  // const search = req.query.search || defaults.search;

  const { limit, page, search } = req.query;

  try {
    const posts = await Post.findAllPosts({
      page,
      limit,
      sort: { updatedAt: -1 },
      search,
    });

    if (posts.length === 0) {
      return response(res, "This post was not found", 404);
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
        self: "/articles?page=2&limit=10",
        next: "/articles?page=3&limit=10",
        prev: "/articles?page=1&limit=10",
      },
    });
  } catch (error) {
    next(error);
  }
};
const postArticleController = async (req, res, next) => {
  try {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.mapped() });
    }

    let { title, bodyText, cover, tags } = req.body;

    const title_url =
      lowercaseText(title, " ", "-").slice(0, 20) +
      "-" +
      shortId().toLowerCase();

    tags = lowercaseText(tags, " ");
    const post = await Service.createDocument(
      {
        title,
        title_url,
        bodyText,
        cover,
        tags,
        author: req.user._id,
      },
      "post"
    );

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
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getSingleArticleController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findOnePost = await Post.findSinglePost({ id });
    if (!findOnePost) {
      return response(res, "This post was not found", 400);
    }
    const comment = await Comment.find({
      $and: [{ post: findOnePost.id }, { status: "APPROVED" }],
    });
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
  } catch (error) {
    next(error);
  }
};
const putSingleArticlesUpdateController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const patchSingleArticleUpdateController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const deleteSingleArticlesDeleteController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const postDelete = await Post.findPostAndDelete({ id });
    if (!postDelete) {
      return response(res, "Post not available", 400);
    }
    console.log("Article deleted successfully");
    return res
      .status(204)
      .json({ postDelete, message: "Article deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticlesController,
  postArticleController,
  getSingleArticleController,
  putSingleArticlesUpdateController,
  patchSingleArticleUpdateController,
  deleteSingleArticlesDeleteController,
};
