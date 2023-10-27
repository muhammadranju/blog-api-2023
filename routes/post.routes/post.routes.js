const router = require("express").Router();

router.get("/articles/:id");
router.get("/articles");

router.get("/articles/:id/comment");
router.post("/articles/:id/comment");
router.get("/articles/:id/author");

router.post("/articles");
router.put("/articles/:id");
router.patch("/articles/:id");
router.delete("/articles/:id");

module.exports = router;
