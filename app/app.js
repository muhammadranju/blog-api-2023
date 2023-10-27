const express = require("express");
const app = express();

app.use([require("./middleware"), require("../routes")]);
app.use([
  (req, res, next) => {
    res.status(404).json({ status: 404, message: "Resource not found." });
    next();
  },
  (err, req, res, next) => {
    res.status(500).json({ status: 500, message: "Something went wrong." });
  },
]);

module.exports = app;
