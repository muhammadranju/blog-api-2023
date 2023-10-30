const { validationResult } = require("express-validator");
const NodeCache = require("node-cache");

const Service = require("../../service/DB_Services.service/DB_Services.service");
const errorFormatter = require("../../utils/errorFormatter/errorFormatter");
const lowercaseText = require("../../utils/lowercase_text.utils/lowercase_text.utils");
const myCache = new NodeCache({ stdTTL: 60 });

const getArticlesController = async (req, res, next) => {
  try {
    if (myCache.has("posts")) {
      console.log("gating from cache");
      return res.status(200).json(myCache.get("posts"));
    }
    const posts = await Service.find(
      "post",
      "title title_url bodyText cover tags authorID",
      10,
      { _id: -1 },
      "authorID",
      "username email createdAt updatedAt"
    );
    myCache.set("posts", {
      data: posts,
      pagination: {
        page: 2,
        limit: 10,
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
    return res.status(200).json({
      data: posts,
      pagination: {
        page: 2,
        limit: 10,
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
    const title_url = lowercaseText(title, " ", "_") + Date.now();
    tags = lowercaseText(tags, " ");
    const post = await Service.createDocument(
      {
        title,
        title_url,
        bodyText,
        cover,
        tags,
        authorID: req.user._id,
      },
      "post"
    );
    method;
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
