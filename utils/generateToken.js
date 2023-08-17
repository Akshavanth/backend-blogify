const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  //payload
  const payload = {
    user: {
      id: user._id,
    },
  };
  //create token
  const token = jwt.sign(payload, "anykey", {
    expiresIn: 36000, //exp in 1hr
  });

  return token;
};

module.exports = generateToken;
