const router = require("express").Router();
const Auth = require("../../service/authentication_authorization.service/authentication_authorization.service");

router.get("/", Auth.authentication, (req, res) => {
  res.json({ message: "hello" });
});

module.exports = router;
