const index = require("express").Router();
const userRoute = require("./user.routes/user.routes");
const homeRoute = require("./home.routes/home.routes");

index.use([userRoute, homeRoute]);
module.exports = index;
