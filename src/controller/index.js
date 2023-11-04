const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60 });

const User = require("../libs/user.libs/user.libs");

const homeController = async (req, res, next) => {
  try {
    if (myCache.has("ranju")) {
      console.log("gating from cache");
      return res.status(200).json(myCache.get("ranju"));
    }

    const userData = await User.findAllUsers();

    myCache.set("ranju", userData);
    console.log("api request");
    return res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

const notFoundErrorHandler = (req, res, next) => {
  res.status(404).json({ status: 404, message: "Resource not found." });
  next();
};

const serverErrorHandler = (err, req, res, next) => {
  // TODO: format error
  console.log("\nInternal Server Error: ", err);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
};

module.exports = {
  homeController,
  notFoundErrorHandler,
  serverErrorHandler,
};
