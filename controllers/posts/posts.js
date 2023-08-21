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

  res.json({
    status: "success",
    message: "Creat epost successfully",
    post,
  });
});
