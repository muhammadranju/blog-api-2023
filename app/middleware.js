const express = require("express");

const middleware = [
  express.json({ extended: true }),
  express.urlencoded({ extended: true }),
];

module.exports = middleware;
