const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");

// register user
// end point /api/v1/users/register

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //! check if user is already existed
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("User already eisted");
  }

  const newUser = new User({
    email,
    username,
    password,
  });

  const salt = await bcrypt.genSalt(10);

  newUser.password = await bcrypt.hash(password, salt);

  await newUser.save();

  res.status(201).json({
    status: "success",
    message: "user registered sccessfully",
    // _id: newUser?.id,
    // username: newUser?.username,
    // role: newUser?.role,
    newUser,
  });
});

// login user
// end point /api/v1/users/login

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // check credential
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Invalid login credentials");
    }

    //check hash password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new Error("Invalid login credentials");
    }

    user.lastLogin = new Date();
    await user.save();

    res.status(201).json({
      status: "success",
      message: "user logged in sccessfully",
      _id: user?._id,
      username: user?.username,
      role: user?.role,
      email: user?.email,
      token: generateToken(user),
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: error?.message,
    });
  }
};

//get profile
// endpoint /api/v1/users/profile/:id

exports.getProfile = asyncHandler(async (req, res, next) => {
  const id = req.userAuth._id;

  const user = await User.findById(id);

  res.json({
    status: "success",
    message: "profile fetched",
    user,
  });
});
