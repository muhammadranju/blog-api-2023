const express = require("express");
const errors = require("../controller");
const app = express();

app.use([require("./middleware"), require("../routes")]);
app.use([errors.notFoundErrorHandler, errors.serverErrorHandler]);

module.exports = app;
