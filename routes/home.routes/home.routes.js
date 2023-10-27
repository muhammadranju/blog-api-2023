const router = require("express").Router();
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");

const Service = require("../../service/DB_Services.service/DB_Services.service");
router.get("/", Authentication, async (req, res) => {
  const data = await Service.find(
    "username email role",
    10,
    { _id: -1 },
    "user"
  );
  res.json({ message: "hello", data });
});

module.exports = router;
