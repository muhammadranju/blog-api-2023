const router = require("express").Router();
const userRoute = require("./user.routes/user.routes");
const homeRoute = require("./home.routes/home.routes");
const postRoute = require("./post.routes/post.routes");
const authRoute = require("./auth.routes/auth.routes");
const commentRoute = require("./comment.routes/comment.routes");

const apiURL = "/api/v1";

router.use(apiURL, homeRoute);
router.use(apiURL, postRoute);
router.use(apiURL, authRoute);
router.use(apiURL, commentRoute);
router.use(apiURL, userRoute);
module.exports = router;
