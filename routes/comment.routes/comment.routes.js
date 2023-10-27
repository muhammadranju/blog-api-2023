const router = require("express").Router();

router.get("/comments");
router.post("/comments");
router.patch("/comments/:id");
router.delete("/comments/:id");

module.exports = router;
