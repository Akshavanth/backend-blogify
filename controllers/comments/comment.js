const asyncHandler = require("express-async-handler");
const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");

exports.createComment = asyncHandler(async (req, res) => {
  const { message } = req.body;

  const postId = req.params.postId;

  const comment = await Comment.create({
    message,
    author: req.userAuth._id,
    postId,
  });

  await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: comment._id,
      },
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "comment created successfully",
    comment,
  });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Comment successfully deleted",
  });
});

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      message: req.body.message,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  console.log(req.params.id);

  if (!comment) {
    throw new Error("Comment does not exist");
  }

  res.status(201).json({
    status: "success",
    message: "comment successfully updated",
    comment,
  });
});
