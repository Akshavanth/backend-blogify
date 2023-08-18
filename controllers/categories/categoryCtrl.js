const asyncHandler = require("express-async-handler");
const Category = require("../../model/Category/Category");

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, author } = req.body;

  const categoryFound = await Category.findOne({ name });

  if (categoryFound) {
    throw new Error("Category already found");
  }

  const category = await Category.create({
    name: name,
    author: req?.userAuth?._id,
  });

  res.status(201).json({
    status: "success",
    message: "Category successfully created",
    category,
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Category successfully deleted",
  });
});

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.status(201).json({
    status: "success",
    message: "Category successfully fetched",
    categories,
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new Error("Category does not exist");
  }

  res.status(201).json({
    status: "success",
    message: "Category successfully updated",
    category,
  });
});
