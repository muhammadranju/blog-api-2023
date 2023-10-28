const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("../utils/rate_limit.utils/rate_limit.utils");
const userAgent = require("../middleware/userAgent.middleware/userAgent.middleware");
const middleware = [
  express.json({ extended: true }),
  express.urlencoded({ extended: true }),
  compression(),
  // userAgent,
  morgan("dev"),
  rateLimit,
];

module.exports = middleware;
