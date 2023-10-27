const express = require("express");
const morgan = require("morgan");
const rateLimit = require("../utils/rate_limit.utils/rate_limit.utils");

const middleware = [
  express.json({ extended: true }),
  express.urlencoded({ extended: true }),
  // morgan("dev"),
  rateLimit,
];

module.exports = middleware;
