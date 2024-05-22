"use strict";

const router = require("express").Router();

const blog = require("../controllers/blog");
const permissions = require("../middlewares/permissions");

router.route("/").get(blog.list).post(permissions.isLogin, blog.create);

router
  .route("/:id")
  .get(blog.read)
  .put(permissions.isLogin, blog.update)
  .patch(permissions.isLogin, blog.update)
  .delete(permissions.isLogin, blog.delete);

router.route("/:id/postLike").post(permissions.isLogin, blog.postLike);
router.route("/:id/getLike").get(permissions.isLogin, blog.getLike);

module.exports = router;