const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const isLoggin = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(" ")[1];

  //? verify token
  jwt.verify(token, "anykey", async (err, decoded) => {
    const userId = decoded?.user?.id;

    const user = await User.findById(userId).select("username email role _id");

    req.userAuth = user;

    if (err) {
      const err = new Error("Toke expired/Invalid");
      next(err);
    } else {
      //! save the user
      //* send the user
      next();
    }
  });
};

module.exports = isLoggin;
