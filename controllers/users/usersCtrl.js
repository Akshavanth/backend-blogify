const User = require("../../model/User/User");

exports.register = async (req, res) => {
  try {
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

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "user registered sccessfully",
      _id: newUser?.id,
      username: newUser?.username,
      role: newUser?.role,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: error?.message,
    });
  }
};
