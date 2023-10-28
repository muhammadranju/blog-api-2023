const router = require("express").Router();
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
const Service = require("../../service/DB_Services.service/DB_Services.service");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60 });
const url = `https://jsonplaceholder.typicode.com/todos`;
router.get("/", async (req, res) => {
  if (myCache.has("ranju")) {
    console.log("gating from cache");
    return res.status(200).json(myCache.get("ranju"));
  }
  const userData = await Service.find(
    "username email role",
    1,
    { _id: -1 },
    "user"
  );
  // const data = await fetch(url);
  // const userData = await data.json();
  myCache.set("ranju", userData);
  console.log("api request");
  return res.status(200).json(userData);
});

module.exports = router;
