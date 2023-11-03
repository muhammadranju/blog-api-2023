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

    if (req.user.role !== "ADMIN") {
      return res.status(401).json({ message: "You don't have access." });
    }

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
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
};

module.exports = {
  homeController,
  notFoundErrorHandler,
  serverErrorHandler,
};
