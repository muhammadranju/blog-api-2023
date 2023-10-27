const router = require("express").Router();
const Auth = require("../../middleware/authentication.middleware/authentication.middleware");

router.get("/", Auth, (req, res) => {
  res.json({ message: "hello" });
});

module.exports = router;
