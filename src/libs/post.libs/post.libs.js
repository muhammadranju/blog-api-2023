const Post = require("../../models/post.models/post.models");
const defaults = require("../../config/defaults");
// const { populate } = require("../../models/comment.models/comment.models");
const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    title: { $regex: search, $options: "i" },
  };
  const posts = await Post.find(filter)
    .populate({ path: "authorID", select: "fullName" })
    .limit(limit)
    .skip(page * limit - limit)
    .sort(sortStr);
  return posts;
};

const findAllPosts = async ({ limit = 5, page = 1, sort, search = "" }) => {
  limit = +limit;
  page = +page;

  if (!page) {
    page = 1;
  }
  if (!limit) {
    limit = 5;
  }

  const skip = (page - 1) * limit;
  search = search.toLowerCase();
  if (search) {
    return await Post.find({
      status: "PUBLISHED",
      $or: [
        { title: { $regex: ".*" + search + ".*", $options: "i" } },
        { title_url: { $regex: ".*" + search + ".*", $options: "i" } },
        { bodyText: { $regex: ".*" + search + ".*", $options: "i" } },
        { tags: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    })
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate({ path: "author", select: "username" })
      .select("-__v");
  }

  const posts = await Post.find({
    status: "PUBLISHED",
    $or: [
      { title: { $regex: ".*" + search + ".*", $options: "i" } },
      { bodyText: { $regex: ".*" + search + ".*", $options: "i" } },
      { bodyText: { $regex: ".*" + search + ".*", $options: "i" } },
      { tags: { $regex: ".*" + search + ".*", $options: "i" } },
    ],
  })
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .populate({ path: "author", select: "username" })
    .select("-__v");
  return posts;
};

const findSinglePost = async ({ id }) => {
  const post = await Post.findOne({
    // $or: [{ _id: id }],
    // $or: [{ title_url: id }],
    title_url: id,
  })
    .populate({
      path: "author",
      select: "username",
    })

    .select("-__v")
    .exec();
  return post;
};

const findPostAndDelete = async ({ id }) => {
  return await Post.findOneAndDelete({ title_url: id });
};

// await Post.findOneAndUpdate(
// { _id: post },
// { $push: { comments: comment._id } }
// );
const pushCommentInPost = async (id, updates) => {
  return await Post.findByIdAndUpdate({ ...id }, { $push: { ...updates } });
};

module.exports = {
  findAllItems,
  findAllPosts,
  pushCommentInPost,
  findSinglePost,
  findPostAndDelete,
};
