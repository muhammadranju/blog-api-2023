const router = require("express").Router();
const Authentication = require("../../middleware/authentication.middleware/authentication.middleware");
router.get("/comments");
router.post("/comments", Authentication);
router.patch("/comments/:id", Authentication);
router.delete("/comments/:id", Authentication);

module.exports = router;
