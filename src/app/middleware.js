const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const rateLimit = require("../utils/rateLimit.utils/rateLimit.utils");
const userAgent = require("../middleware/userAgent.middleware");
const middleware = [
  express.json({ extended: true }),
  express.urlencoded({ extended: true }),
  compression(),
  cookieParser(),
  // userAgent,
  morgan("dev"),
  // rateLimit,
];

module.exports = middleware;
