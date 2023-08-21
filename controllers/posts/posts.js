const asynchandler = require("express-async-handler");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const Category = require("../../model/Category/Category");

exports.createPost = asynchandler(async (req, res) => {
  const { title, content, author, categoryId } = req.body;

  const postFound = await Post.findOne({ title });

  if (postFound) {
    throw new Error("Post already found");
  }

  const post = await Post.create({
    title,
    content,
    author: req?.userAuth?._id,
    category: categoryId,
  });

  await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );

  await Category.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Creat epost successfully",
    post,
  });
});

exports.getPosts = asynchandler(async (req, res) => {
  const allPost = await Post.find({});

  res.status(201).json({
    status: "success",
    message: "Posts successfully fetched",
    allPost,
  });
});

exports.getPost = asynchandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Post successfully fetched",
    post,
  });
});

exports.deletePost = asynchandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Post successfully deleted",
  });
});

exports.updatePost = asynchandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(201).json({
    status: "success",
    message: "post updated successfully",
    post,
  });
});
