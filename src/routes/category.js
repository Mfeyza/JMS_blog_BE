"use strict";

const router = require("express").Router();
const category = require("../controllers/category");
const permissions = require("../middlewares/permissions");

router.route("/").get(category.list).post(category.create);

router
  .route("/:id")
  .get(category.read)
  .put(permissions.isAdmin, category.update)
  .patch(permissions.isAdmin, category.update)
  .delete(permissions.isAdmin, category.delete);

module.exports = router;