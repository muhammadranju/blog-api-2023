const index = require("express").Router();
const userRoute = require("./user.routes/user.routes");
const homeRoute = require("./home.routes/home.routes");
const postRoute = require("./post.routes/post.routes");
const authRoute = require("./auth.routes/auth.routes");
const commentRoute = require("./comment.routes/comment.routes");

index.use([homeRoute, postRoute, authRoute, commentRoute]);
module.exports = index;
