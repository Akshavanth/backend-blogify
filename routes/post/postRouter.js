const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const { createPost } = require("../../controllers/posts/posts");

const postRouter = express.Router();

postRouter.post("/", isLoggin, createPost);

module.exports = postRouter;
