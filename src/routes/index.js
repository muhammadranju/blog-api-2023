const router = require("express").Router();
const { ApiVersion } = require("../constants");

const userRoute = require("./user.routes");
const homeRoute = require("./home.routes");
const postRoute = require("./post.routes");
const authRoute = require("./auth.routes");
const commentRoute = require("./comment.routes");

router.use(ApiVersion, homeRoute);
router.use(ApiVersion, postRoute);
router.use(ApiVersion, authRoute);
router.use(ApiVersion, commentRoute);
router.use(ApiVersion, userRoute);
module.exports = router;
