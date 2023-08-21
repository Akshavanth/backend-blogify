const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
} = require("../../controllers/posts/posts");

const postRouter = express.Router();

postRouter.post("/", isLoggin, createPost);
postRouter.get("/", getPosts);
postRouter.get("/:id", isLoggin, getPost);
postRouter.delete("/:id", isLoggin, deletePost);
postRouter.put("/:id", isLoggin, updatePost);

module.exports = postRouter;
