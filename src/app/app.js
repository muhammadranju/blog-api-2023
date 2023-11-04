const express = require("express");
const app = express();

const { notFoundErrorHandler, serverErrorHandler } = require("../controller");
const middleware = require("./middleware");
const routes = require("../routes");

app.use(middleware); // middleware
app.use(routes); // routes

app.use([notFoundErrorHandler, serverErrorHandler]);

module.exports = app;
