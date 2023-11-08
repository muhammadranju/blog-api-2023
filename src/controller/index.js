const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60 });

const ApiResponse = require("../utils/ApiResponse");
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
  const err = new ApiResponse(
    404,
    {},
    `Con't find ${req.originalUrl} on the server!`
  );

  next(err);
};

const serverErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 500,
    statusCode: err.statusCode,
    message: err.message,
    stackTrace: err.stack,
    error: err,
  });

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
      stackTrace: err.stack,
      error: err,
    });
  } else if (process.env.NODE_ENV === "production") {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    });
  }
};

module.exports = {
  homeController,
  notFoundErrorHandler,
  serverErrorHandler,
};
