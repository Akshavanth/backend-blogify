const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categories/categoryCtrl");
const isLoggin = require("../../middlewares/isLoggin");

const categoryRouter = express.Router();

categoryRouter.post("/", isLoggin, createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.put("/:id", isLoggin, updateCategory);
categoryRouter.delete("/:id", isLoggin, deleteCategory);

module.exports = categoryRouter;
