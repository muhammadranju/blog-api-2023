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

class ApiResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.o;
  }
}

const notFoundErrorHandler = (req, res, next) => {
  const err = new ApiResponse(
    `Con't find ${req.originalUrl} on the server!`,
    404
  );

  next(err);
};

const serverErrorHandler = (err, req, res, next) => {
  // console.log("\nInternal Server Error: ", err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode || 500).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });
};

module.exports = {
  homeController,
  notFoundErrorHandler,
  serverErrorHandler,
  ApiResponse,
};
