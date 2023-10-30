const Service = require("../service/DB_Services.service/DB_Services.service");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60 });
const url = `https://jsonplaceholder.typicode.com/todos`;

const homeController = async (req, res, next) => {
  try {
    if (myCache.has("ranju")) {
      console.log("gating from cache");
      return res.status(200).json(myCache.get("ranju"));
    }
    const userData = await Service.find(
      "username email role",
      10,
      { _id: -1 },
      "user"
    );
    // const data = await fetch(url);
    // const userData = await data.json();
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
